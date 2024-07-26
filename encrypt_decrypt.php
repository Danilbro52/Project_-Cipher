<?php
function vigenere($text, $key, $encrypt = true) {
    $key = strtoupper($key);
    $keyLength = strlen($key);
    $result = '';

    for ($i = 0, $j = 0; $i < strlen($text); $i++) {
        $c = $text[$i];

        if (ctype_alpha($c)) {
            $offset = ord($key[$j % $keyLength]) - ord('A');
            if (!$encrypt) {
                $offset = -$offset;
            }

            if (ctype_upper($c)) {
                $result .= chr((ord($c) - ord('A') + $offset + 26) % 26 + ord('A'));
            } else {
                $result .= chr((ord($c) - ord('a') + $offset + 26) % 26 + ord('a'));
            }
            $j++;
        } else {
            $result .= $c;
        }
    }

    return $result;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $text = $_POST['text'];
    $key = $_POST['key'];
    $action = $_POST['action'];

    if ($action === 'encrypt') {
        $output = vigenere($text, $key, true);
    } else {
        $output = vigenere($text, $key, false);
    }

    echo htmlspecialchars($output);
}
?>
