"use strict";
let queryObject;
let timestampToDate;
let formattedDate;
let isConnected;
const clientInfoElements = document.getElementById('extras_websocketConnected_innerHTML');
const pidInfoElements = {
    cpu: document.getElementById('pidinfo_cpu_innerHTML'),
    memory: document.getElementById('pidinfo_memory_innerHTML'),
    ctime: document.getElementById('pidinfo_ctime_innerHTML'),
    elapsed: document.getElementById('pidinfo_elapsed_innerHTML'),
    timestamp: document.getElementById('pidinfo_timestamp_innerHTML'),
};
const extrasElements = {
    activeClients: document.getElementById('extras_activeClients_innerHTML'),
    clientsCounter: document.getElementById('extras_clientsCounter_innerHTML'),
};
const chatMessageElements = document.getElementById('chatMessage_innerHTML');
const serverMessageElements = document.getElementById('serverMessage_innerHTML');
const latencyGoogleElements = document.getElementById('latencyGoogle_innerHTML');
const latencyUserElements = document.getElementById('latencyUser_innerHTML');
const rconInfoElements = {
    name: document.getElementById('rconInfoName_innerHTML'),
    ver: document.getElementById('rconInfoVer_innerHTML'),
};
const rconPlayersElements = document.getElementById('extras_innerHTML');
function handleClientInfo(data) {
    if (clientInfoElements)
        clientInfoElements.innerHTML = data;
}
// interface PacketHandlers {
//     [key: string]: (data: string) => void;
// }
const packetHandlers = {
    serverMessage: function (data) {
        // console.log(`Server Message: ${data}`);
        if (serverMessageElements)
            serverMessageElements.innerHTML += /*HTML*/ `<div class='display_flex_row no_wrap padding_double'><div class='darker display_flex_row no_wrap margin_double'>${data}</div></div>`;
    },
    chatMessage: function (data) {
        if (chatMessageElements)
            chatMessageElements.innerHTML = data;
    },
    extras: function (data) {
        if (extrasElements.activeClients)
            extrasElements.activeClients.innerHTML = `${data.activeClients}`;
        if (extrasElements.clientsCounter)
            extrasElements.clientsCounter.innerHTML = `${data.clientsCounter}`;
    },
    pidInfo: function (data) {
        if (pidInfoElements.cpu)
            pidInfoElements.cpu.innerHTML = Number(data.cpu / 4).toFixed(1);
        if (pidInfoElements.memory)
            pidInfoElements.memory.innerHTML = Number(data.memory / 1024 / 1024 / 1024).toFixed(1);
        if (pidInfoElements.ctime)
            pidInfoElements.ctime.innerHTML = Number(data.ctime / 1000 / 60).toFixed(1);
        if (pidInfoElements.elapsed)
            pidInfoElements.elapsed.innerHTML = Number(data.elapsed / 1000 / 60).toFixed(1);
        timestampToDate = new Date(Number(data.timestamp));
        formattedDate = timestampToDate.toLocaleTimeString();
        if (pidInfoElements.timestamp)
            pidInfoElements.timestamp.innerHTML = formattedDate;
    },
    latencyGoogle: function (data) {
        if (latencyGoogleElements)
            latencyGoogleElements.innerHTML = data;
    },
    latencyUser: function (data) {
        if (latencyUserElements)
            latencyUserElements.innerHTML = data;
    },
    rconInfo: function (data) {
        if (rconInfoElements.name)
            rconInfoElements.name.innerHTML = data.name;
        if (rconInfoElements.ver)
            rconInfoElements.ver.innerHTML = data.ver;
    },
    rconPlayers: function (data) {
        let players = '';
        for (const key in data) {
            players += `<div class="player-info">
          <div>Name: ${data[key].name}</div>
          <div>Player UID: ${data[key].playeruid}</div>
          <div>Steam ID: ${data[key].steamid}</div>
          </div>`;
        }
        if (rconPlayersElements)
            rconPlayersElements.innerHTML = `<div class="darker display_flex_col margin_double padding_double">
      <div class="lighter display_flex_col align_center justify_center align_self_center" style="width:90%;">Connected Player</div>
      <div class="lighter" id="player_container_grid">${players}</div></div>`;
    },
};
function handlePacket(packet) {
    handleClientInfo(`${isConnected ? "connected" : "disconnected"}`);
    for (const mainKey in packet) {
        if (!(mainKey in packetHandlers))
            return;
        if (!(mainKey in packet))
            return;
        const Paket = packet[mainKey];
        switch (mainKey) {
            case 'serverMessage':
                packetHandlers.serverMessage(Paket);
                break;
            case 'chatMessage':
                packetHandlers.chatMessage(Paket);
                break;
            case 'extras':
                packetHandlers.extras(Paket);
                break;
            case 'pidInfo':
                packetHandlers.pidInfo(Paket);
                break;
            case 'latencyGoogle':
                packetHandlers.latencyGoogle(Paket);
                break;
            case 'latencyUser':
                packetHandlers.latencyUser(Paket);
                break;
            case 'rconInfo':
                packetHandlers.rconInfo(Paket);
                break;
            case 'rconPlayers':
                packetHandlers.rconPlayers(Paket);
                break;
        }
    }
}
function on_load() {
    handleClientInfo(isConnected ? "connected" : "disconnected");
    const serverip = 'neo.dnsfor.me';
    const serverport = 8080;
    const ws = new WebSocket('wss://' + serverip + ':' + serverport);
    ws.onopen = function (event) {
        isConnected = true;
        const searchParams_temp = new URL(window.location.href).searchParams;
        queryObject = {};
        searchParams_temp.forEach((value, key) => {
            queryObject[key] = value;
        });
        queryObject["greeting"] = "Hello";
        ws.send(JSON.stringify(queryObject));
        isConnected = true;
        console.log(`WebSocket is onopen now. ${event}`);
    };
    ws.onmessage = function (event) {
        const packet = JSON.parse(event.data);
        if ("type" in packet && "obj" in packet) {
            handlePacket(packet.obj);
        }
        else {
            ws.send(JSON.stringify(queryObject));
        }
    };
    ws.onclose = function close() {
        isConnected = false;
        console.log('disconnected');
    };
    ws.onerror = function error() {
        isConnected = false;
        console.log('disconnected');
    };
}
window.addEventListener("load", () => { on_load(); });
export {};
//# sourceMappingURL=main.js.map