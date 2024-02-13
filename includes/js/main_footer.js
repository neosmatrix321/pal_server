const serverip = '127.0.0.1';
const serverport = 8080;
    
const ws = new WebSocket('wss://' + serverip + ':' + serverport);
console.log(ws);
    
ws.onopen = function(event) {
    ws.send('test');
    console.log("WebSocket is onopen now.");
};
    
ws.onmessage = function(event) {
    console.log("WebSocket is onmessage now.");
};
    
ws.onclose = function(event) {
    console.log("WebSocket is onclose now.");
};