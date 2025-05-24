<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "cosmetic_store";
    $port = 3307;

    $conn = new mysqli($servername, $username, $password, $database, $port);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $name = trim($_POST["username"]);
    $email = trim($_POST["email"]);
    $message = trim($_POST["message"]);

    $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $message);

    if ($stmt->execute()) {
        echo "<div class='alert alert-success text-center'>Your message has been sent successfully!</div>";
    } else {
        echo "<div class='alert alert-danger text-center'>Error: " . $stmt->error . "</div>";
    }

    $stmt->close();
    $conn->close();

    echo "<script>setTimeout(() => { window.location.href = '../cosmetic-store-main/contact.html'; }, 500);</script>";
    exit();
}
?>
