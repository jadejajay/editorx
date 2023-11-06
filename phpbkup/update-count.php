<?php
$targetFile = 'updates.php';

if (file_exists($targetFile)) {
    // Read the existing content of the target file
    $currentContent = file_get_contents($targetFile);

    // Find and update the count
    preg_match('/\$updateCount\s*=\s*(\d+)/', $currentContent, $matches);
    if (isset($matches[1])) {
        $visitCount = intval($matches[1]);
        $visitCount++; // Increment the count
        $updatedContent = str_replace('$updateCount = ' . $matches[1], '$updateCount = ' . $visitCount, $currentContent);

        // Write the updated content back to the target file
        file_put_contents($targetFile, $updatedContent);

        echo "Count updated successfully. New count: " . $visitCount;
    } else {
        echo "Count variable not found in the target file.";
    }
} else {
    echo "Target file not found.";
}
?>
