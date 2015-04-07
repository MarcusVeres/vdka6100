<?php

    // vars
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $postal_code = $_POST['postal_code'];
    $phone = $_POST['phone'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // mail content
    $form_content="From: $first_name $last_name \n\n Email: $email \n Phone: $phone \n\n Postal Code: $postal_code \n\n Subject: $subject \n Message: $message";

    // 
    $recipient = "marcus.veres@gmail.com";
    $subject_line = $subject;
    $mail_header = "From: contact_form@vdka6100.com \r\n";

    // 
    mail($recipient, $subject_line, $form_content, $mail_header) or die("Error!");

    // redirect
    $path = '/thank-you.php';
    header("Location: $path");

    echo "Thank You!";

?>

