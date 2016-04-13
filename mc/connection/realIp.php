<?PHP

function getUserIP()
{
  $client  = @$_SERVER['HTTP_CLIENT_IP'];
  $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
  $remote  = $_SERVER['REMOTE_ADDR'];

  return $client." ".$forward." ".$remote."".$_SERVER['REMOTE_ADDR']." ".$_SERVER['SERVER_ADDR'];
}

?>