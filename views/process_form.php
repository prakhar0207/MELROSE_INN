<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $appt_type = htmlspecialchars(trim($_POST['appt_type']));

    // Basic validation
    if (!empty($name) && !empty($email) && !empty($appt_type)) {
        // Here you can add code to save the data to a database or send an email
        // For demonstration, we'll just display the data
        echo "Thank you, $name. We have received your request for a $appt_type.";
        echo " We will contact you shortly at $email.";
    } else {
        echo "All fields are required.";
    }
} else {
    echo "Invalid request method.";
}
?>
