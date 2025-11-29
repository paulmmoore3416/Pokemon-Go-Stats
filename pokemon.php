<?php
header('Content-Type: application/json');

// Sample Pokémon data (could be from database)
$pokemonData = [
    [
        'name' => 'Pikachu',
        'type' => 'Electric',
        'stats' => ['HP' => 111, 'Attack' => 112, 'Defense' => 96, 'Speed' => 110],
        'image' => 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'
    ],
    [
        'name' => 'Charizard',
        'type' => 'Fire/Flying',
        'stats' => ['HP' => 156, 'Attack' => 223, 'Defense' => 173, 'Speed' => 178],
        'image' => 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png'
    ]
    // Add more as needed
];

echo json_encode($pokemonData);
?>