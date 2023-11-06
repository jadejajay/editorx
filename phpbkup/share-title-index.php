<!DOCTYPE html>
<html>
<head>
    <title>Content Dashboard</title>
</head>
<body>
    <h1>Content Dashboard</h1>
    <form action="update_content.php" method="POST">
        <label for="content">Content:</label><br>
        <textarea name="content" id="content" rows="5" cols="50"><?php echo getContent(); ?></textarea><br>
        <input type="submit" value="Save">
    </form>
</body>
</html>