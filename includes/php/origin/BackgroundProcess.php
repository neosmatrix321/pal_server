<?php 
namespace origin;
class BackgroundProcess
{

  public $command;
  public $process = null;
  public $status = null;
  public $statusAll = null;
  private $descriptorspec;
  public $output = '';
  public $log_path;
  public $pid_file;
  public $log_file;
  public $error_file;
  public $pid = null;
  public $exit_code = null;

  public function __construct($command, $log_path)
  {
    // $this->clean_up = shell_exec('ps --no-headers -eF | grep "defunct" | head -n-1 | awk "{ print $ 2 }" | while read DATA; do kill $DATA ; done');
    $this->log_path = $log_path;
    $this->pid_file = $this->log_path . "server.pid";
    // $this->log_file = $this->log_path . "output.log";
    // $this->error_file = $this->log_path . "error.log";
    // $this->command = "nohup " . $command . " 2> '" . $this->error_file . "' 1> '" . $this->log_file . "' &";
    if (file_exists($this->pid_file))
      $this->pid = file_get_contents($this->pid_file);

    $this->status = $this->checkStatus();

    // $this->processes = [];
    // try {
  }
  public function start()
  {
    @unlink($this->log_file);
    @unlink($this->error_file);
    // @unlink($_SESSION['const']['dir']['log_create_server'] . "process_error.log");
    // @unlink($_SESSION['const']['dir']['log_create_server'] . "process_output.log");
    try {
      $this->exit_code = shell_exec($this->command);
    } catch (\Exception $e) {
      console_log(array(time() => 'Der Prozess konnte nicht gestartet werden (time ' . time() . ') ' . $e->getMessage()), "process_error");
      return false;
    }		// $this->pid = posix_getpppid();
    usleep(65000);
    $this->pid = (int) shell_exec('echo -n `ps -eF --no-header | sed -ne "/PalServer-Linux/p" | head -n-1 | awk "{ print $ 2 }" | sed -e "s/[\n\r]//"`');
    file_put_contents($this->pid_file, $this->pid);
    try {
      $this->status = $this->checkStatus();
    } catch (\Exception $e) {
      console_log(array(time() => 'no status ' . $e->getMessage() . " (time " . time() . ")"), "process_error");
      return false;
    }

    // console_log(array("start_time" => time()), "process_error");
    // console_log(array("start_time" => time()), "process_output");
    return true;
  }
  // public function get_output() {
  //   // if (!is_resource($this->process)) {$this->error[] = 'Der Prozess konnte nicht gefunden werden.'; return false; }
  //   // if (!$this->checkStatus()) { $this->error[] = 'Outpur: kein checkStatus().'; $this->output[] = proc_close($this->process); }
  //   // if (!is_resource($this->pipes[1])) { $this->error[] = '$output leer.'; return false; }
  //   if (!file_exists($this->log_file)) return $this->output = '';
  //   $this->output = file_get_contents($this->log_file);
  //   return $this->output;
  // }
  // public function isRunning() {
  //   $this->status = $this->checkStatus();
  //   if ($this->status['alive'] === true) return true;
  //   else return false;
  // }
  public function checkStatus()
  {
    $temp['alive'] = false;
    $temp['time_created'] = 0;
    $temp['time_running'] = 0;
    $temp['pid'] = null;
    $temp['status'] = 'none';
    if (!(@file_exists($this->pid_file))) {
      $this->pid = (int) shell_exec('echo -n `ps -eF --no-header | sed -ne "/PalServer-Linux/p" | head -n-1 | awk "{ print $ 2 }" | sed -e "s/[\n\r]//"`');
      file_put_contents($this->pid_file, $this->pid);
    }
    if (@file_exists($this->pid_file)) {
      $temp['pid'] = file_get_contents($this->pid_file);
      $temp['time_created'] = filectime($this->pid_file);
      if (!(@file_exists('/proc/' . $temp['pid'] . '/status'))) {
        unlink($this->pid_file);
        $this->pid = (int) shell_exec('echo -n `ps -eF --no-header | sed -ne "/PalServer-Linux/p" | head -n-1 | awk "{ print $ 2 }" | sed -e "s/[\n\r]//"`');
        file_put_contents($this->pid_file, $this->pid);
      }
    }
    if (@file_exists($this->pid_file)) {
      if (file_exists('/proc/' . $temp['pid'] . '/status')) {
        $this->pid = $temp['pid'];
        $temp['alive'] = true;
        $temp['time_created'] = filectime($this->pid_file);
        $temp['time_running'] = (time() - $temp['time_created']);
        // $temp['status'] = shell_exec("ps -eF --no-header | sed -ne '/[^-]\ \/usr\/bin\/php/p' | sed -ne '/[^-]\ \/usr\/bin\/php/p' | sed -e 's/[\n\r]//'");
        $temp_1 = array("CPU Load", "RAM", "CPU Time", "Time Elapsed", "PID");
        $temp_2 = preg_split('/\ /', shell_exec('ps --no-header -o %cpu,%mem,time,etime,pid -p ' . $temp['pid']), 0, PREG_SPLIT_NO_EMPTY);
        $temp['status'] = array_combine($temp_1, $temp_2); // .' | sed -ne "/[^-]\ \/usr\/bin\/php/p" | sed -ne	"/[^-]\ \/usr\/bin\/php/p"'
      } else {
        $temp['pid'] = null;
        // console_log(array(time() => "process does not exists pid " . $temp['pid'] . " start time " . filectime($this->pid_file)), "process_error");
        @unlink($this->pid_file);
        $temp['status'] = '';
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