let my_interval;
function http(url, reason) {
  let my_target = document.getElementById(reason);
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == this.DONE) {
      if (/^\s*\{/.test(this.responseText)) {
        if (typeof my_interval !== 'undefined') clearInterval(my_interval);
        let json_var;
        // try { my_div_layout_preview.innerHTML = "0 "+JSON.parse(this.responseText); }
        // catch { my_div_layout_preview.innerHTML = "1 "+this.responseText; }
        try { json_var = JSON.parse(this.responseText); }
        catch (e) { temp = e.message; }
        if (typeof json_var.ping_innerHTML !== "undefined") temp = json_var.ping_innerHTML;
        if (temp != '') my_target.innerHTML = temp;
      }
      return;
    }
    if (this.readyState != this.DONE) {
      my_target.innerHTML = "loading";
      if (typeof my_interval === 'undefined') my_interval = setInterval(() => {
        my_target.innerHTML += "."
      }, 500);
    }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("");
}
function on_load() {
  http('includes/get_ping.php', 'ping_innerHTML');
}
window.addEventListener("load", () => { on_load(); });
