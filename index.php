<?php
spl_autoload_register(function ($classname) {
  // Klassennamen auflösen
  $namespace = strpos($classname, "\\") ? substr($classname, 0, strpos($classname, "\\")) : '';
  $classname = strpos($classname, "\\") ? substr($classname, strpos($classname, "\\") + 1) : $classname;
  // Klassendatei laden
  $filename = __DIR__ . "/includes/php/{$namespace}/{$classname}.php";
  if (file_exists($filename)) {
    require_once $filename;
  }
});
function get_process_info(&$my_server_obj)
{
  $my_server_obj->checkStatus();
  $temp_server["alive"] = $my_server_obj->status['alive'];
  $temp_server["command"] = $my_server_obj->command;
  $temp_server['host_port'] = 'dummy';
  $temp_server['time_created'] = $my_server_obj->status['time_created'];
  $temp_server['time_running'] = $my_server_obj->status['time_running'];
  $temp_server['exit_code'] = $my_server_obj->exit_code;
  $temp_server['status'] = json_encode($my_server_obj->status['status'], JSON_FORCE_OBJECT | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_NUMERIC_CHECK);
  // $temp_server['process_server_output'] = read_logs("process_server_output");
  // $temp_server['server_output'] = read_logs("server_output");
  // $temp_server['process_server_error'] = json_encode(read_logs("process_server_error"));
  // $temp_server['server_error'] = read_logs("server_error");
  return $temp_server;
}
?>
<html lang="en">

  <head>
    <title>Pal Server</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" type="text/css" href="css/main.css" media="screen" />
    <script src="includes/js/main.js"></script>
  </head>

  <body style="">
    <div id="main_container">
    <?php
    $my_server_obj = new origin\BackgroundProcess("echo", __DIR__ . "/server/");
    $server_status = get_process_info($my_server_obj);
    if ($server_status['alive'] === true) {
      exec('/bin/meine_scripts/arrcon -n -S default -Q Info', $output_server_name);
      if (@isset($output_server_name[0])) {
        $output_server_name_split = preg_split('/\]|\[/', $output_server_name[0], 3, PREG_SPLIT_NO_EMPTY);
        echo <<<HTML
          <div><h1>Welcome to {$output_server_name_split[2]} Server</h1><h2>running: {$output_server_name_split[1]}</h2></div><div style="width:100%;">&nbsp;</div>
          HTML;
        if (isset($_REQUEST['admin']) && $_REQUEST['admin'] == 1) {
          exec('/bin/meine_scripts/arrcon -n -S default -Q ShowPlayers', $output_server_ConnPlayer);
            echo <<<HTML
            <div class="darker display_flex_col margin_double padding_double">
              <div class="lighter display_flex_col align_center justify_center align_self_center" style="width:90%;">Connected Player</div>
              <div class="lighter" id="player_container_grid">
            HTML;
          foreach ($output_server_ConnPlayer as $value) {
            $temp_value = explode(',', $value);
            foreach ($temp_value as $value_column)
              echo <<<HTML
              <div class="darker padding_grid display_flex_col">{$value_column}</div>
              HTML;
          }
          echo <<<HTML
              </div>
            </div>
            HTML;
        }
      }
      echo <<<HTML
        <div class="darker display_flex_col max_content">
          <div class="lighter display_flex_col max_content margin_double">
        HTML;
      $status = json_decode($server_status['status'], true);
      foreach ($status as $key => $value) {
        echo <<<HTML
          <div class="darker display_flex_col max_content padding_double">{$key}: {$value}</div>
          HTML;
      }
      echo <<<HTML
          </div>
        </div>
        HTML;
    } else {
      echo <<<HTML
        <div class="darker display_flex_col max_content">
          <div class="lighter display_flex_col max_content margin_double">
            <div class="darker display_flex_col max_content">
              <h1>Sorry Server not started</h1>
            </div>
          </div>
        </div>
        HTML;
      // try { $my_server_obj->start(); } 
      // catch (Exception $e) {
      //   print_r(array(time() => "cannot create server " . $e->getMessage()), "process_server_error");
      // }
      // $server_command = $my_server_obj->command;
      // $server_obj = get_process_info($my_server_obj);
    
    }

    ?>
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
      <div class="lighter display_flex_col">
        <div class="darker display_flex_row no_wrap">
          <div>ping (8.8.8.8)&nbsp;</div>
          <div id="ping_innerHTML"></div>
        </div>
      </div>
      <div class="lighter display_flex_col" style="">
        <pre>
          <?php
          $server_log = file('/var/www/html/pal_server/logs/server.log', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
          foreach ($server_log as $file_value) {
            echo <<<HTML
            <div class="darker display_flex_row no_wrap" style="">
            {$file_value}
            </div>
            HTML;
          }
          ?>
        </pre>
      </div>
      <div class="lighter display_flex_col no_wrap" style="">
        <div class="darker display_flex_col no_wrap" style="">
          <pre>
            <?php
            exec('top -n1 -bp `cat /var/www/html/pal_server/server/server.pid`', $output);
            foreach ($output as $value) {
              echo <<<HTML
              {$value}<br>
              HTML;
            }
            ?>
          </pre>
        </div>
      </div>
    </div>
  </body>
  <!-- <script src="includes/js/main_footer.js" type="module"></script> -->
</html>