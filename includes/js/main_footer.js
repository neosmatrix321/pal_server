const serverip = 'neo.dnsfor.me';
const serverport = 8080;
let queryObject;
const ws = new WebSocket('wss://' + serverip + ':' + serverport);
let timestampToDate;
let formattedDate;
console.log(ws);
// console.log(ws.readyState);

ws.onopen = function(event) {
  let searchParams_temp = new URL(window.location.href).searchParams;
 queryObject = {};

  searchParams_temp.forEach((value, key) => {
    queryObject[key] = value;
  });
  queryObject["greeting"] = "Hello";
  ws.send(JSON.stringify(queryObject));
  console.log("WebSocket is onopen now.");
};

// ws.onping =;

// elements = {
//   document.getElementById('pidinfo_cpu'),
//   ...
//  }
ws.onmessage = function(event, isBinary) {
    let sender;
    let json_var = JSON.parse(event.data, { binary: isBinary });
    if (json_var.ip == "192.168.228.7") sender = "Server"
    else sender = json_var.ip;
    if (typeof json_var.obj.palserver_processinfo !== "undefined")
      document.getElementById('pidinfo_cpu').innerHTML = "CPU Load:&nbsp;" + Number(json_var.obj.palserver_pidinfo.cpu / 4).toFixed(1) + "%";
    if (typeof json_var.obj.palserver_processinfo !== "undefined")
      document.getElementById('pidinfo_memory').innerHTML = "RAM usage:&nbsp;" + Number(json_var.obj.palserver_pidinfo.memory / 1024 / 1024 / 1024).toFixed(1) + " GB";
    if (typeof json_var.obj.palserver_processinfo !== "undefined")
      document.getElementById('pidinfo_ctime').innerHTML = "ctime:&nbsp;" + Number(json_var.obj.palserver_pidinfo.ctime / 1000 / 60).toFixed(1) + " min";
    if (typeof json_var.obj.palserver_processinfo !== "undefined")
      document.getElementById('pidinfo_elapsed').innerHTML = "Uptime:&nbsp;" + Number(json_var.obj.palserver_pidinfo.elapsed / 1000 / 60).toFixed(1) + " min";
    if (typeof json_var.obj.palserver_processinfo !== "undefined") {
      timestampToDate = new Date(Number(json_var.obj.palserver_pidinfo.timestamp));
      formattedDate = timestampToDate.toLocaleTimeString();
      document.getElementById('pidinfo_timestamp').innerHTML = "Timestamp:&nbsp;" + formattedDate;
    }
    if (typeof json_var.latency_google !== "undefined")
      document.getElementById('google_ping_innerHTML').innerHTML = "Google: " + Number(json_var.latency_google).toFixed(1) + "ms";
    if (typeof json_var.latency_user !== "undefined")
      document.getElementById('user_ping_innerHTML').innerHTML = "User: " + Number(json_var.latency_user).toFixed(1) + "ms";

    // console.log("WebSocket is onmessage now.");
    if (typeof json_var.extras_first_innerHTML !== "undefined") 
      document.getElementById('extras_first_innerHTML').innerHTML = /*HTML*/`<div class="darker display_flex_col margin_double padding_double">
      <div class="lighter display_flex_col align_center justify_center align_self_center" style="width:90%;">Connected Player</div>
      <div class="lighter" id="player_container_grid">${json_var.extras_first_innerHTML}</div></div>`;

    if (typeof json_var.obj.websocket_innerHTML !== "undefined") 
      document.getElementById('websocket_innerHTML').innerHTML += "<div class='display_flex_row no_wrap padding_double'><div class='darker display_flex_row no_wrap margin_double'>From " + sender + "</div><div class='darker display_flex_row no_wrap margin_double'>Message: " + json_var.obj.websocket_innerHTML + "</div></div>";
    // console.log("WebSocket is onmessage now.");
    // console.log(json_var);
};
ws.onclose = function close() {
  console.log('disconnected');
};    



// import WebSocket from '../.././node_modules/ws/index.js';

// const ws = new WebSocket('wss://127.0.0.1:8080/');

// ws.on('error', console.error);

// ws.on('open', function open() {
//     heartbeat();
//   console.log('connected');
//   ws.send(Date.now());
// });
// ws.on('ping', heartbeat);

// ws.on('close', function close() {
//   console.log('disconnected');
//   clearTimeout(this.pingTimeout);
// });

// ws.on('message', function message(data) {
//   console.log(`Round-trip time: ${Date.now() - data} ms`);

//   setTimeout(function timeout() {
//     ws.send(Date.now());
//   }, 500);
// });