<?php 

include("lib/qrlib.php");
include("generator/qr.php");
include("connection/realIp.php");
$actual_link = "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];

$tempDir = "../file/";

$codeContents = $actual_link."?q=".$generateKeyQrCode;

$fileName = uniqid().'.png';

$pngAbsoluteFilePath = $tempDir.$fileName;
$urlRelativeFilePath = '../file_temp/'.$fileName;

QRcode::png($codeContents, $pngAbsoluteFilePath);

echo getUserIP();

?>


<img src="<?php echo $tempDir; ?><?php echo $fileName; ?>">