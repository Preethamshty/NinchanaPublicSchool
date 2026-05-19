<?php

header('Content-Type: text/plain; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(403);
    echo 'Invalid request.';
    exit;
}

$recipient = 'ninchanapublicschool@gmail.com';
$formType = isset($_POST['form_type']) ? trim($_POST['form_type']) : 'contact';
$page = trim($_POST['page'] ?? $_SERVER['HTTP_REFERER'] ?? 'Website');

if ($formType === 'newsletter') {
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);

    if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo 'Please enter a valid email address.';
        exit;
    }

    $subject = 'Newsletter subscription - Ninchana Public School';
    $email_content = "A visitor subscribed to the newsletter.\n\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Page: $page\n";
    $email_headers = "From: Ninchana Website <noreply@ninchanapublicschool.com>\r\n";
    $email_headers .= "Reply-To: $email\r\n";
    $successMessage = 'Thank you! You are subscribed to our newsletter.';
} else {
    $name = strip_tags(trim($_POST['name'] ?? ''));
    $name = str_replace(array("\r", "\n"), array(' ', ' '), $name);
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $subjectField = trim($_POST['subject'] ?? 'General enquiry');
    $number = trim($_POST['number'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo 'Please complete all required fields and try again.';
        exit;
    }

    $subject = 'Contact form - Ninchana Public School';
    $email_content = "New message from the website contact form.\n\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $number\n";
    $email_content .= "Subject: $subjectField\n";
    $email_content .= "Page: $page\n\n";
    $email_content .= "Message:\n$message\n";
    $email_headers = "From: $name <$email>\r\n";
    $email_headers .= "Reply-To: $email\r\n";
    $successMessage = 'Thank you! Your message has been sent.';
}

if (mail($recipient, $subject, $email_content, $email_headers)) {
    http_response_code(200);
    echo $successMessage;
} else {
    http_response_code(500);
    echo 'Sorry, we could not send your message. Please email ninchanapublicschool@gmail.com directly.';
}
