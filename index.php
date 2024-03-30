<html lang="en">

  <head>
    <title>Pal Server</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" type="text/css" href="css/main.css" media="screen" />
    <!-- <script src="includes/js/main.js"></script> -->
    <script src="includes/js/main.js" type="module"></script>
  </head>

  <body style="">
    <div id="main_container">
     <div class="lighter display_flex_col nowrap max_content padding_double"><h1 class="darker display_flex_row nowrap padding_double" style="min-width:90vw;">Welcome to&nbsp;<div id="rconInfoName_innerHTML">a PalWorld</div>&nbsp;Server</h1><h2>ver.: &nbsp;<div id="rconInfoVer_innerHTML">NaN</div></h2></div>


            <div id="extras_innerHTML"></div>
 
        <div class="darker display_flex_col max_content">
          <div class="lighter display_flex_col max_content margin_double" style="min-width:200px;">
            <div class="darker display_flex_row nowrap max_content padding_double">CPU Load:&nbsp;<div id="pidinfo_cpu_innerHTML">NaN</div>&nbsp;%</div>
            <div class="darker display_flex_row nowrap max_content padding_double">RAM usage:&nbsp;<div id="pidinfo_memory_innerHTML">NaN</div>&nbsp;GB</div>
            <div class="darker display_flex_row nowrap max_content padding_double">ctime:&nbsp;<div id="pidinfo_ctime_innerHTML">NaN</div>&nbsp;min</div>
            <div class="darker display_flex_row nowrap max_content padding_double">Uptime:&nbsp;<div id="pidinfo_elapsed_innerHTML">NaN</div>&nbsp;min</div>
            <div class="darker display_flex_row nowrap max_content padding_double">Time:&nbsp;<div id="pidinfo_timestamp_innerHTML">NaN</div>&nbsp;</div>
          </div>
        </div>

<!--
        <div class="darker display_flex_col max_content">
          <div class="lighter display_flex_col max_content margin_double">
            <div class="darker display_flex_col max_content">
              <h1>Sorry Server not started</h1>
            </div>
          </div>
        </div>
-->
    <div id="readme" class="darker">
      <div class="lighter display_flex_col max_content margin_double">
        <h2>Some links maybee worth to visit:</h2>
        <div class="darker display_flex_col max_content">
          <div class="link"><a href="https://paldex.gg" target="_blank">paldex.gg</a></div>
          <div class="link"><a href="https://tech.palworldgame.com" target="_blank">tech.palworldgame.com</a></div>
          <div class="link"><a href="https://palworld.gg" target="_blank">palworld.gg</a></div>
        </div>
        <div class="darker display_flex_row wrap max_content padding_max" style="display: block;">
          The server will restart every 6 hours<br><br>Regards neosmatrix &#9829;<br>Contact me: <a
            href="https://discord.gg/2xMxsK3wF6" title="Community Discord Server">Discord</a>
        </div>
      </div>
    </div>
    <div class="darker display_flex_col" style="width:max-content;">
      <div class="lighter display_flex_col wrap">
        <div class="darker display_flex_row no_wrap">Websocket Notifications</div>
      </div>
      <div class="lighter display_flex_row no_wrap">
        
       <div class="darker no_wrap">Clients active:&nbsp;
        <div id="extras_activeClients_innerHTML">NaN</div>
      </div>
      
      <div class="darker no_wrap">Clients counter:&nbsp;
        <div id="extras_clientsCounter_innerHTML">NaN</div>
       </div>

       <div class="darker no_wrap">Websocket&nbsp;
         <div id="extras_websocketConnected_innerHTML">NaN</div>
       </div>
      </div>
      <div class="lighter display_flex_row no_wrap">
      <div class='display_flex_row no_wrap padding_double'>
      <div class='darker display_flex_row no_wrap margin_double'>
       <div id="chatMessage_innerHTML">NaN</div>
       </div>
      </div>
      </div>
      <div class="lighter display_flex_col">
        <div class="darker display_flex_row no_wrap">Server Notifications</div>
       <div id="serverMessage_innerHTML">&nbsp;</div>
      </div>
      <div class="lighter display_flex_col">
        <div class="darker display_flex_row no_wrap">latency to</div>
        <div class="display_flex_row no_wrap">
        <div class="darker">Google:&nbsp;<div id="latencyGoogle_innerHTML">NaN</div></div>
        <div class="darker">User:&nbsp;<div id="latencyUser_innerHTML">NaN</div></div>
        </div>
      </div>
      <div class="lighter display_flex_col" style="">
      </div>
      <div class="lighter display_flex_col no_wrap" style="">
        <div class="darker display_flex_col no_wrap" style="">
          <pre>
          </pre>
        </div>
      </div>
    </div>
  </body>
</html>