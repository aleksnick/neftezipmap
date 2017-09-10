<?php 

session_start();

$res = array();
$phone = '';
$message = '';

if (isset($_GET['phone'])) {
  $phone = trim(strval($_GET['phone']));
}

if (isset($_GET['message'])) {
  $message = trim(strval($_GET['message']));
}

$res['res'] = 'Сообщение успешно отправлено!';

echo json_encode($res);