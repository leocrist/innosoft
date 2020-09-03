<?php


// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

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
	
	// Send User
    //Recipients
    $mail->setFrom('no-replay@ferdon.io', 'Q-Modeler');
    $mail->addAddress($_REQUEST['businessmail']);

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Q-Modeler contact sale replay';
	$mail->Body    = file_get_contents("newletter.php");
	$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
	
	// Send Sales
	//Recipients
	//Server settings
	
	$mail2 = new PHPMailer(true);
	
    $mail2->SMTPDebug = 0;                                 // Enable verbose debug output
    $mail2->IsSMTP(); // set mailer to use SMTP
    $mail2->Host = "smtp.gmail.com"; // specify main and backup server
    $mail2->SMTPAuth = true;                               // Enable SMTP authentication
    $mail2->Username = 'qmodelercontactsale@gmail.com';                 // SMTP username
    $mail2->Password = 'qmodeler1234';                           // SMTP password
    $mail2->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail2->Port = 465;   
	
	
    $mail2->setFrom('no-replay@ferdon.io', 'Q-Modeler');
    $mail2->addAddress('fred@ferdon.io');
    $mail2->AddCC('tobrien@ferdon.io');
    $mail2->AddBCC('tongquocsu@ferdon.io');
	
	$body = '';
	$body .= '<p>Dear Sale Team , </P>';
	$body .= '<p><strong>User</strong>: '.$_REQUEST['fullname'].'</p>';
	$body .= '<p><strong>Email</strong>: '.$_REQUEST['email'].'</p>';
	$body .= '<p><strong>Phone Number</strong>: '.$_REQUEST['phone'].'</p>';
	$body .= '<p><strong>Company Name</strong>: '.$_REQUEST['companyname'].'</p>';
	$body .= '<p><strong>Sent request to Q-Modeler with message</strong>: '.$_REQUEST['message'].'</p>';
	$body .= '<p>Q-Modeler System for Contact Sale</p>';
    //Content
    $mail2->isHTML(true);                                  // Set email format to HTML
    $mail2->Subject = 'New User Contact to Q-Modeler';
	$mail2->Body    = $body;
	$mail2->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail2->send();

} catch (Exception $e) {
    echo json_encode($e);
}

?>