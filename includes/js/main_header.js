"use strict";
let queryObject;
let timestampToDate;
let formattedDate;
let isConnected = false;


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

function handlePidInfo(data) {
  pidInfoElements.cpu.innerHTML = Number(data.cpu / 4).toFixed(1);
  pidInfoElements.memory.innerHTML = Number(data.memory / 1024 / 1024 / 1024).toFixed(1);
  pidInfoElements.ctime.innerHTML = Number(data.ctime / 1000 / 60).toFixed(1);
  pidInfoElements.elapsed.innerHTML = Number(data.elapsed / 1000 / 60).toFixed(1);
  timestampToDate = new Date(Number(data.timestamp));
  formattedDate = timestampToDate.toLocaleTimeString();
  pidInfoElements.timestamp.innerHTML = formattedDate;
}

function handleChatMessage(data) {
  //  const sender = data.ip || 'NaN';
    chatMessageElements.innerHTML = data;
}

function handleServerMessage(data) {
  console.log(`Server Message: ${data}`);
    serverMessageElements.innerHTML += "<div class='display_flex_row no_wrap padding_double'><div class='darker display_flex_row no_wrap margin_double'>" + data + "</div></div>";
}

function handleExtras(data) {
  extrasElements.activeClients.innerHTML = data.activeClients;
  extrasElements.clientsCounter.innerHTML = data.clientsCounter;
}

function latencyGoogleInfo(data) {
    latencyGoogleElements.innerHTML = data;
}

function latencyUserInfo(data) {
    latencyUserElements.innerHTML = data;
}

function handleRconInfo(data) {
    rconInfoElements.name.innerHTML = data.name;
    rconInfoElements.ver.innerHTML = data.ver;
}

function handleRconPlayers(data) {
  let players = '';
  // console.dir(data);
  for (const key in data) {
    players += `<div class="player-info">
      <div>Name: ${data[key].name}</div>
      <div>Player UID: ${data[key].playeruid}</div>
      <div>Steam ID: ${data[key].steamid}</div>
      </div>`;
  }
  // data.foreach(row => {
  //   players += /*html*/`
  //   <div class="player-info">
  //     <div>Name: ${row.name}</div>
  //     <div>Player UID: ${row.playeruid}</div>
  //     <div>Steam ID: ${row.steamid}</div>
  //   </div>
  // `;
  // });

  rconPlayersElements.innerHTML = /*HTML*/`<div class="darker display_flex_col margin_double padding_double">
      <div class="lighter display_flex_col align_center justify_center align_self_center" style="width:90%;">Connected Player</div>
      <div class="lighter" id="player_container_grid">${players}</div></div>`;
}

const packetHandlers = {
    "serverMessage": handleServerMessage,
    "extras": handleExtras,
    "pidInfo": handlePidInfo,
    "chatMessage": handleChatMessage,
    "latencyGoogle": latencyGoogleInfo,
    "latencyUser": latencyUserInfo,
    "rconInfo": handleRconInfo,
    "rconPlayers": handleRconPlayers,
};


function handlePacket(type, packet) {
  // console.info(`Handling packet of type: ${type}`)
  type.forEach((newType) => {
    const handler = packetHandlers[newType]; 
    if (handler) {
        handler(packet[newType]); // Pass relevant data to the handler
    }
  });
}
function on_load() {
  const serverip = 'neo.dnsfor.me';
  // const serverip = '192.168.228.7';
  // const serverip = 'localhost';
  const serverport = 8080;
  const ws = new WebSocket('wss://' + serverip + ':' + serverport);
  // console.log(ws);

  ws.onopen = function(event) {
    isConnected = true;
    let searchParams_temp = new URL(window.location.href).searchParams;
    queryObject = {};

    searchParams_temp.forEach((value, key) => {
      queryObject[key] = value;
    });
    queryObject["greeting"] = "Hello";
    ws.send(JSON.stringify(queryObject));
    console.log("WebSocket is onopen now.");
  };

  ws.onmessage = function(event, isBinary) {
    let packet = JSON.parse(event.data, { binary: isBinary });
    // console.dir(packet, { depth: 3, colors: true });
      if (packet.type && packet.obj) {
        handlePacket(packet.type, packet.obj);
      } else {
        queryObject["error"] = "No Packet found";
        queryObject["blob"] = packet;
        console.log("No packet:", packet);
        
        ws.send(JSON.stringify(queryObject));
      }
      // console.log(event);
  };
  ws.onclose = function close() {
    isConnected = false;
    console.log('disconnected');
  };    

  ws.error = function close() {
    isConnected = false;
    console.log('disconnected');
  };    

}
window.addEventListener("load", () => { on_load(); });
