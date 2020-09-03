<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';
//header('Content-type: application/json');

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //Server settings
    $mail->SMTPDebug = 0;                                 // Enable verbose debug output
    $mail->IsSMTP(); // set mailer to use SMTP
    $mail->Host = "smtp.gmail.com"; // specify main and backup server
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'qmodelercontactsale@gmail.com';                 // SMTP username
    $mail->Password = 'qmodeler1234';                           // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('no-replay@ferdon.io', 'Q-Modeler');
    $mail->addAddress($_POST['email']);

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Q-Modeler Whitepaper Download';
    $mail->Body    = file_get_contents("ferdon_mail.html");
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();

} catch (Exception $e) {
    echo json_encode($e);
}
