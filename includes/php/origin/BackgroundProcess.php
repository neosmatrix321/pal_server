<?php 
namespace origin;
class BackgroundProcess
{

  public $status = null;
  private $pid_file = null;
  private $root_path = null;
  private $log_file = null;
  public $pid = null;

  public function __construct($root_path)
  {
    $this->root_path = $root_path;
    $this->pid_file = $this->root_path."/server/pal_server.pid";
    $this->log_file = $this->root_path."/logs/pal_server.log";
    $this->status = $this->checkStatus();
  }
  // public function start()
  // {
  //   try {
  //     $this->exit_code = shell_exec($this->command);
  //   } catch (\Exception $e) {
  //     return false;
  //   }
  //   usleep(65000);
  //   $this->pid = (int) shell_exec('echo -n `ps -eF --no-header | sed -ne "/PalServer-Linux/p" | head -n-1 | awk "{ print $ 2 }" | sed -e "s/[\n\r]//"`');
  //   file_put_contents($this->pid_file, $this->pid);
  //   try {
  //     $this->status = $this->checkStatus();
  //   } catch (\Exception $e) {
  //     return false;
  //   }
  //   return true;
  // }
  public function checkStatus()
  {
    $temp['alive'] = false;
    $temp['time_created'] = 0;
    $temp['time_running'] = 0;
    $temp['pid'] = null;
    $temp['status'] = 'none';
    if (@file_exists($this->pid_file)) {
      $temp['pid'] = file_get_contents($this->pid_file);
      if (file_exists('/proc/' . $temp['pid'] . '/status')) {
        $this->pid = $temp['pid'];
        $temp['alive'] = true;
        $temp['time_created'] = filectime($this->pid_file);
        $temp['time_running'] = (time() - $temp['time_created']);
        $temp_1 = array("CPU Load", "RAM", "CPU Time", "Time Elapsed", "PID");
        $temp_2 = preg_split('/\ /', shell_exec('ps --no-header -o %cpu,%mem,time,etime,pid -p ' . $temp['pid']), 0, PREG_SPLIT_NO_EMPTY);
        $temp['status'] = array_combine($temp_1, $temp_2);
      } else {
        $temp['pid'] = "";
        $temp['alive'] = false;
        $temp['time_created'] = "";
        $temp['time_running'] = "";
        $temp['status'] = array("CPU Load" => "", "RAM" => "", "CPU Time" => "", "Time Elapsed" => "", "PID" => "");
      }
    }
    $this->pid = $temp['pid'];
    return $temp;
  }
  public function terminate()
  {
    $temp = true;
    if (file_exists($this->pid_file)) {
      $this->checkStatus();
      unlink($this->pid_file);
      try {
        $temp = posix_kill($this->pid, 9);
      } catch (\Exception $e) {
        $temp = $e->getMessage();
      }
    }
    $this->pid = (int) shell_exec('echo -n `ps -eF --no-header | sed -ne "/PalServer-Linux/p" | awk "{ print $ 2 }" | sed -e "s/[\n\r]//"`');
    if (isset($this->pid) && $this->pid > 0)
      try {
        $temp = posix_kill($this->pid, 9);
      } catch (\Exception $e) {
        $temp = $e->getMessage();
      }

    return $temp;
  }
}