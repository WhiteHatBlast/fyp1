<?php 

include("lib/qrlib.php");
include("connection/realIp.php");
$actual_link = "http://".$_SERVER['HTTP_HOST']."/mc/page/";

$tempDir = "../file/";

$codeContents = $actual_link."info/?q=".$generateKeyQrCode;

$fileName = $generateKeyQrCode.'.png';
$urlFIle = "http://".$_SERVER['HTTP_HOST']."/mc/file/".$fileName;

$pngAbsoluteFilePath = $tempDir.$fileName;
$urlRelativeFilePath = '../file_temp/'.$fileName;

QRcode::png($codeContents, $pngAbsoluteFilePath);

?>