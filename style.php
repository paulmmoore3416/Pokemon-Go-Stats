<?php
header('Content-Type: text/css');

// Dynamic CSS based on theme
$theme = $_GET['theme'] ?? 'dark';

if ($theme === 'light') {
    echo "
    body {
        background: linear-gradient(135deg, #f5f7fa 60%, #e2e6ea 100%);
        color: #222;
    }
    #pokemon-profile {
        background: #fff;
        border-color: #e2e6ea;
    }
    ";
} else {
    echo "
    body {
        background: linear-gradient(135deg, #24292e 60%, #161b22 100%);
        color: #c9d1d9;
    }
    #pokemon-profile {
        background: #161b22;
        border-color: #30363d;
    }
    ";
}
?>