"use strict";
export interface IRconStatsPlayers {
  name: string,
  playeruid: string,
  steamid: string,
  [key: string]: string;
}

export interface IRconStatsInfo {
  name: string,
  ver: string,
  [key: string]: string;
}

interface IPU {
  cpu: number,
  memory: number,
  pid: number,
  ctime: number,
  elapsed: number,
  timestamp: number,
  elapsedFormated: string,
  ctimeFormated: string,
  cpuFormated: string,
  memFormated: string,
  [key: string]: number | string;
}

interface IExtras {
  activeClients: number;
  clientsCounter: number;
  [key: string]: number;

}

interface IClientMessagePaket {
  serverMessage: string;
  pidInfo: IPU;
  extras: IExtras;
  chatMessage: string;
  rconPlayers: IRconStatsPlayers[];
  rconInfo: IRconStatsInfo;
  latencyGoogle: string;
  latencyUser: string;
  [key: string]: string | IPU | IExtras | IRconStatsPlayers[] | IRconStatsInfo;
}

let queryObject: { [key: string]: string };
let timestampToDate: Date;
let formattedDate: string;
let isConnected: boolean;

const clientInfoElements: HTMLElement | null = document.getElementById('extras_websocketConnected_innerHTML');

interface PidInfoElements {
    cpu: HTMLElement | null,
    memory: HTMLElement | null,
    ctime: HTMLElement | null,
    elapsed: HTMLElement | null,
    timestamp: HTMLElement | null,
}

const pidInfoElements: PidInfoElements = {
    cpu: document.getElementById('pidinfo_cpu_innerHTML'),
    memory: document.getElementById('pidinfo_memory_innerHTML'),
    ctime: document.getElementById('pidinfo_ctime_innerHTML'),
    elapsed: document.getElementById('pidinfo_elapsed_innerHTML'),
    timestamp: document.getElementById('pidinfo_timestamp_innerHTML'),
};

interface ExtrasElements {
    activeClients: HTMLElement | null,
    clientsCounter: HTMLElement | null,
}

const extrasElements: ExtrasElements = {
    activeClients: document.getElementById('extras_activeClients_innerHTML'),
    clientsCounter: document.getElementById('extras_clientsCounter_innerHTML'),
};

const chatMessageElements: HTMLElement | null = document.getElementById('chatMessage_innerHTML');
const serverMessageElements: HTMLElement | null = document.getElementById('serverMessage_innerHTML');
const latencyGoogleElements: HTMLElement | null = document.getElementById('latencyGoogle_innerHTML');
const latencyUserElements: HTMLElement | null = document.getElementById('latencyUser_innerHTML');

interface RconInfoElements {
    name: HTMLElement | null,
    ver: HTMLElement | null,
}

const rconInfoElements: RconInfoElements = {
    name: document.getElementById('rconInfoName_innerHTML'),
    ver: document.getElementById('rconInfoVer_innerHTML'),
};

const rconPlayersElements: HTMLElement | null = document.getElementById('extras_innerHTML');

function handleClientInfo(data: string): void {
  if (clientInfoElements) clientInfoElements.innerHTML = data;
}


// interface PacketHandlers {
//     [key: string]: (data: string) => void;
// }

const packetHandlers = {
    serverMessage: function(data: string) {
      // console.log(`Server Message: ${data}`);
      if (serverMessageElements) serverMessageElements.innerHTML += /*HTML*/`<div class='display_flex_row no_wrap padding_double'><div class='darker display_flex_row no_wrap margin_double'>${data}</div></div>`;
    },
    chatMessage: function(data: string) {
      if (chatMessageElements) chatMessageElements.innerHTML = data;
    },
    extras: function(data: IExtras) {
      if (extrasElements.activeClients) extrasElements.activeClients.innerHTML = `${data.activeClients}`;
      if (extrasElements.clientsCounter) extrasElements.clientsCounter.innerHTML = `${data.clientsCounter}`;
    },
    pidInfo: function(data: IPU) {
      if (pidInfoElements.cpu) pidInfoElements.cpu.innerHTML = Number(data.cpu / 4).toFixed(1);
      if (pidInfoElements.memory) pidInfoElements.memory.innerHTML = Number(data.memory / 1024 / 1024 / 1024).toFixed(1);
      if (pidInfoElements.ctime) pidInfoElements.ctime.innerHTML = Number(data.ctime / 1000 / 60).toFixed(1);
      if (pidInfoElements.elapsed) pidInfoElements.elapsed.innerHTML = Number(data.elapsed / 1000 / 60).toFixed(1);
      timestampToDate = new Date(Number(data.timestamp));
      formattedDate = timestampToDate.toLocaleTimeString();
      if (pidInfoElements.timestamp) pidInfoElements.timestamp.innerHTML = formattedDate;
    },
    latencyGoogle: function(data: string) {
      if (latencyGoogleElements) latencyGoogleElements.innerHTML = data;
    },
    latencyUser: function(data: string) {
      if (latencyUserElements) latencyUserElements.innerHTML = data;
    },
    rconInfo: function(data: IRconStatsInfo) {
      if (rconInfoElements.name) rconInfoElements.name.innerHTML = data.name;
      if (rconInfoElements.ver) rconInfoElements.ver.innerHTML = data.ver;
    },
    rconPlayers: function(data: IRconStatsPlayers[]) {
      let players = '';
      for (const key in data) {
        players += `<div class="player-info">
          <div>Name: ${data[key].name}</div>
          <div>Player UID: ${data[key].playeruid}</div>
          <div>Steam ID: ${data[key].steamid}</div>
          </div>`;
      }
     
      if (rconPlayersElements) rconPlayersElements.innerHTML = `<div class="darker display_flex_col margin_double padding_double">
      <div class="lighter display_flex_col align_center justify_center align_self_center" style="width:90%;">Connected Player</div>
      <div class="lighter" id="player_container_grid">${players}</div></div>`;
    },
};

function handlePacket(packet: Partial<IClientMessagePaket>): void {
  handleClientInfo(`${isConnected ? "connected" : "disconnected"}`);
  for (const mainKey in packet) {
    if (!(mainKey in packetHandlers)) return;
    if (!(mainKey in packet)) return;
    const Paket = packet[mainKey];
    switch (mainKey) {
      case 'serverMessage':
        packetHandlers.serverMessage(Paket as string);
        break;
      case 'chatMessage':
        packetHandlers.chatMessage(Paket as string);
        break;
      case 'extras':
        packetHandlers.extras(Paket as IExtras);
        break;
      case 'pidInfo':
        packetHandlers.pidInfo(Paket as IPU);
        break;
      case 'latencyGoogle':
        packetHandlers.latencyGoogle(Paket as string);
        break;
      case 'latencyUser':
        packetHandlers.latencyUser(Paket as string);
        break;
      case 'rconInfo':
        packetHandlers.rconInfo(Paket as IRconStatsInfo);
        break;
      case 'rconPlayers':
        packetHandlers.rconPlayers(Paket as IRconStatsPlayers[]);
        break;
    }
  }
}

function on_load(): void {
  handleClientInfo(isConnected ? "connected" : "disconnected");

  const serverip: string = 'neo.dnsfor.me';
  const serverport: number = 8080;
  const ws: WebSocket = new WebSocket('wss://' + serverip + ':' + serverport);

  ws.onopen = function(event: Event): void {
    isConnected = true;
    const searchParams_temp: URLSearchParams = new URL(window.location.href).searchParams;
    queryObject = {};

    searchParams_temp.forEach((value, key) => {
      queryObject[key] = value;
    });
    queryObject["greeting"] = "Hello";
    ws.send(JSON.stringify(queryObject));
    isConnected = true;
    console.log(`WebSocket is onopen now. ${event}`);
  };

  ws.onmessage = function(event: MessageEvent): void {
    const packet: { type: string[], obj: Partial<IClientMessagePaket> } = JSON.parse(event.data);
    if ("type" in packet && "obj" in packet) {
      handlePacket(packet.obj as Partial<IClientMessagePaket>);
    } else {
      ws.send(JSON.stringify(queryObject));
    }
  };

  ws.onclose = function close(): void {
    isConnected = false;
    console.log('disconnected');
  };    

  ws.onerror = function error(): void {
    isConnected = false;
    console.log('disconnected');
  };    

}

window.addEventListener("load", () => { on_load(); });
