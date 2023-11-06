<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');

for ($i = 0; $i < 10; $i++) {
  echo "data: " . date('c') . "\n\n";
  ob_flush();
  flush();
  sleep(1); // Emulate data sent at regular intervals.
}
