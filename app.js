const { useState, useEffect } = React;

const rawPokemonList = [
  { name: 'Pikachu', type: 'Electric', stats: { HP: 111, Attack: 112, Defense: 96, Speed: 110, CP: 938, IV: 87 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png' },
  { name: 'Charizard', type: 'Fire/Flying', stats: { HP: 156, Attack: 223, Defense: 173, Speed: 178, CP: 2889, IV: 93 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png' },
  { name: 'Bulbasaur', type: 'Grass/Poison', stats: { HP: 128, Attack: 118, Defense: 111, Speed: 90, CP: 981, IV: 85 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png' },
  { name: 'Squirtle', type: 'Water', stats: { HP: 127, Attack: 94, Defense: 121, Speed: 88, CP: 946, IV: 88 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png' },
  { name: 'Gengar', type: 'Ghost/Poison', stats: { HP: 155, Attack: 261, Defense: 149, Speed: 180, CP: 2878, IV: 91 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/094.png' },
  { name: 'Dragonite', type: 'Dragon/Flying', stats: { HP: 209, Attack: 263, Defense: 198, Speed: 180, CP: 3792, IV: 97 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/149.png' },
  { name: 'Lucario', type: 'Fighting/Steel', stats: { HP: 172, Attack: 236, Defense: 144, Speed: 170, CP: 2703, IV: 92 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/448.png' },
  { name: 'Snorlax', type: 'Normal', stats: { HP: 330, Attack: 190, Defense: 169, Speed: 90, CP: 3225, IV: 89 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/143.png' },
  { name: 'Mewtwo', type: 'Psychic', stats: { HP: 214, Attack: 300, Defense: 182, Speed: 200, CP: 4178, IV: 98 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png' },
  { name: 'Eevee', type: 'Normal', stats: { HP: 146, Attack: 104, Defense: 114, Speed: 100, CP: 1071, IV: 86 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png' },
  { name: 'Garchomp', type: 'Dragon/Ground', stats: { HP: 239, Attack: 261, Defense: 193, Speed: 180, CP: 3962, IV: 95 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/445.png' },
  { name: 'Greninja', type: 'Water/Dark', stats: { HP: 145, Attack: 223, Defense: 152, Speed: 180, CP: 2654, IV: 90 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/658.png' },
  { name: 'Machamp', type: 'Fighting', stats: { HP: 207, Attack: 234, Defense: 159, Speed: 130, CP: 3056, IV: 90 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/068.png' },
  { name: 'Alakazam', type: 'Psychic', stats: { HP: 146, Attack: 271, Defense: 167, Speed: 180, CP: 3057, IV: 92 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/065.png' },
  { name: 'Blastoise', type: 'Water', stats: { HP: 188, Attack: 171, Defense: 207, Speed: 120, CP: 2466, IV: 89 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png' },
  { name: 'Venusaur', type: 'Grass/Poison', stats: { HP: 190, Attack: 198, Defense: 189, Speed: 120, CP: 2720, IV: 91 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png' },
  { name: 'Arcanine', type: 'Fire', stats: { HP: 207, Attack: 227, Defense: 166, Speed: 180, CP: 2839, IV: 90 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/059.png' },
  { name: 'Lapras', type: 'Water/Ice', stats: { HP: 277, Attack: 165, Defense: 174, Speed: 130, CP: 2641, IV: 88 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/131.png' },
  { name: 'Jolteon', type: 'Electric', stats: { HP: 163, Attack: 232, Defense: 182, Speed: 200, CP: 2888, IV: 87 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/135.png' },
  { name: 'Vaporeon', type: 'Water', stats: { HP: 277, Attack: 205, Defense: 161, Speed: 130, CP: 3114, IV: 90 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/134.png' },
  { name: 'Flareon', type: 'Fire', stats: { HP: 163, Attack: 246, Defense: 179, Speed: 180, CP: 3029, IV: 88 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/136.png' },
  { name: 'Umbreon', type: 'Dark', stats: { HP: 216, Attack: 126, Defense: 240, Speed: 120, CP: 2137, IV: 91 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/197.png' },
  { name: 'Espeon', type: 'Psychic', stats: { HP: 163, Attack: 261, Defense: 175, Speed: 180, CP: 3170, IV: 92 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/196.png' },
  { name: 'Sylveon', type: 'Fairy', stats: { HP: 216, Attack: 203, Defense: 205, Speed: 120, CP: 3069, IV: 90 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/700.png' },
  { name: 'Metagross', type: 'Steel/Psychic', stats: { HP: 190, Attack: 257, Defense: 228, Speed: 130, CP: 3791, IV: 95 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/376.png' },
  { name: 'Tyranitar', type: 'Rock/Dark', stats: { HP: 225, Attack: 251, Defense: 207, Speed: 120, CP: 3834, IV: 94 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/248.png' },
  { name: 'Salamence', type: 'Dragon/Flying', stats: { HP: 190, Attack: 277, Defense: 168, Speed: 180, CP: 3749, IV: 93 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/373.png' },
  { name: 'Gardevoir', type: 'Psychic/Fairy', stats: { HP: 169, Attack: 237, Defense: 195, Speed: 130, CP: 3093, IV: 91 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/282.png' },
  { name: 'Blaziken', type: 'Fire/Fighting', stats: { HP: 190, Attack: 240, Defense: 141, Speed: 160, CP: 2848, IV: 89 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/257.png' },
  { name: 'Swampert', type: 'Water/Ground', stats: { HP: 225, Attack: 208, Defense: 175, Speed: 130, CP: 2974, IV: 90 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/260.png' },
  { name: 'Sceptile', type: 'Grass', stats: { HP: 172, Attack: 223, Defense: 169, Speed: 180, CP: 2584, IV: 88 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/254.png' },
  { name: 'Aggron', type: 'Steel/Rock', stats: { HP: 172, Attack: 198, Defense: 257, Speed: 120, CP: 3004, IV: 91 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/306.png' },
  { name: 'Groudon', type: 'Ground', stats: { HP: 205, Attack: 270, Defense: 228, Speed: 130, CP: 4115, IV: 98 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/383.png' },
  { name: 'Rayquaza', type: 'Dragon/Flying', stats: { HP: 213, Attack: 284, Defense: 170, Speed: 180, CP: 4337, IV: 99 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/384.png' },
  { name: 'Mimikyu', type: 'Ghost/Fairy', stats: { HP: 146, Attack: 177, Defense: 199, Speed: 120, CP: 2275, IV: 87 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/778.png' },
  { name: 'Togekiss', type: 'Fairy/Flying', stats: { HP: 198, Attack: 225, Defense: 217, Speed: 120, CP: 3332, IV: 92 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/468.png' },
  { name: 'Garchomp', type: 'Dragon/Ground', stats: { HP: 239, Attack: 261, Defense: 193, Speed: 180, CP: 3962, IV: 95 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/445.png' },
  { name: 'Lucario', type: 'Fighting/Steel', stats: { HP: 172, Attack: 236, Defense: 144, Speed: 170, CP: 2703, IV: 92 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/448.png' },
  { name: 'Zoroark', type: 'Dark', stats: { HP: 155, Attack: 250, Defense: 127, Speed: 180, CP: 2710, IV: 90 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/571.png' },
  { name: 'Dragapult', type: 'Dragon/Ghost', stats: { HP: 204, Attack: 270, Defense: 168, Speed: 200, CP: 3500, IV: 97 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/887.png' },
  { name: 'Incineroar', type: 'Fire/Dark', stats: { HP: 200, Attack: 214, Defense: 175, Speed: 160, CP: 2780, IV: 89 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/727.png' },
  { name: 'Cinderace', type: 'Fire', stats: { HP: 180, Attack: 238, Defense: 163, Speed: 200, CP: 2900, IV: 91 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/815.png' },
  { name: 'Corviknight', type: 'Flying/Steel', stats: { HP: 176, Attack: 206, Defense: 211, Speed: 120, CP: 2600, IV: 88 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/823.png' },
  { name: 'Urshifu', type: 'Fighting/Dark', stats: { HP: 200, Attack: 260, Defense: 180, Speed: 180, CP: 3200, IV: 93 }, image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/892.png' }
];

// Deduplicate (keep first occurrence) in case the source array has duplicates
const pokemonList = rawPokemonList.reduce((acc, p) => {
  if (!acc.some(existing => existing.name === p.name)) acc.push(p);
  return acc;
}, []);

const statDescriptions = {
  HP: 'Health points — how much damage the Pokémon can take.',
  Attack: 'Attack — physical attack strength.',
  Defense: 'Defense — reduces incoming physical damage.',
  Speed: 'Speed — affects move order in many contexts.',
  CP: 'Combat Power — overall battle potency in Pokémon Go.',
  IV: 'Individual Value — hidden bonus percentage for performance.'
};

// GreatBadge removed per request — popup-driven stats are used now

function StatChart({ stats }) {
  const statKeys = ['HP', 'Attack', 'Defense', 'Speed', 'CP', 'IV'];
  const values = statKeys.map(k => stats[k] || 0);
  const max = Math.max(...values, 3000);
  // make the radar polygon smaller so it doesn't touch labels and looks like the example
  const points = values.map((v, i) => {
    const angle = (Math.PI * 2 * i) / values.length - Math.PI / 2;
    const r = 50 + (v / max) * 50; // reduced amplitude
    return [90 + Math.cos(angle) * r, 90 + Math.sin(angle) * r];
  });
  const polygon = points.map(([x, y]) => `${x},${y}`).join(' ');
  return (
    <svg width="180" height="180" viewBox="0 0 180 180">
      <polygon points={polygon} fill="#58a6ff44" stroke="#58a6ff" strokeWidth="2" />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#58a6ff" />
      ))}
      {statKeys.map((k, i) => {
        const angle = (Math.PI * 2 * i) / values.length - Math.PI / 2;
        // place labels further out so they sit around the radar (outside the polygon)
        const x = 90 + Math.cos(angle) * 110;
        const y = 90 + Math.sin(angle) * 110;
        return (
          <text key={k} x={x} y={y} textAnchor="middle" alignmentBaseline="middle" fill="#ffffff" fontSize="12" fontWeight={700}>
            {k}
          </text>
        );
      })}
    </svg>
  );
}

function statQuality(value, max) {
  const pct = (value / max) * 100;
  if (pct >= 75) return { label: 'Best', color: '#ff6b6b' };
  if (pct >= 50) return { label: 'Good', color: '#ffd166' };
  return { label: 'Not So Good', color: '#9aa4b2' };
}

function PokemonCard({ poke, idx, active, onClick, expanded, onToggleExpand }) {
  return (
    <li className={`pokemon-card ${active ? 'active' : ''}`} onClick={onClick}>
      <img src={poke.image} alt={poke.name} className="pokemon-thumb" />
      <span className="pokemon-name">{poke.name}</span>
      <div className={`stats-popup ${expanded ? 'expanded' : ''}`} onClick={(e) => { e.stopPropagation(); onToggleExpand(); }}>
        <div className="popup-inner">
          <div className="popup-star">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="gold">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className="popup-chart">
            <StatChart stats={poke.stats} />
          </div>
          <div className="popup-info">
            {['HP','Attack','Defense','Speed','CP','IV'].map((k) => {
              const val = poke.stats[k] || 0;
              const quality = statQuality(val, Math.max(...Object.values(poke.stats), 3000));
              // show IV as X/30 style where appropriate (IV is shown as percent in dataset, but the example expects move-style counts for IV)
              const displayVal = k === 'IV' && typeof val === 'number' && val <= 100 ? `${Math.round((val/100)*30)}/30` : `${val}${k === 'IV' ? '%' : ''}`;
              return (
                <div key={k} className="popup-row">
                  <div className="popup-row-key" title={statDescriptions[k]} data-tooltip={statDescriptions[k]}>{k}</div>
                  <div className="popup-row-val">{displayVal}</div>
                  <div className="popup-row-label" style={{ background: quality.color }}>{quality.label}</div>
                </div>
              );
            })}

            {/* Moves list (compact) */}
            <div style={{ height: '6px' }} />
            <div className="popup-moves">
              {[
                { type: 'Psychic', name: 'Agility', pp: '30/30' },
                { type: 'Dragon', name: 'Dragon Tail', pp: '10/10' },
                { type: 'Normal', name: 'Slam', pp: '20/20' },
                { type: 'Dragon', name: 'Outrage', pp: '10/10' }
              ].map((m, i) => (
                <div key={i} className="popup-move-row">
                  <div className="popup-move-type">{m.type}</div>
                  <div className="popup-move-name">{m.name}</div>
                  <div className="popup-move-pp">{m.pp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

function Nav({ pokemonList, filteredList, activeIndex, onSelect, expandedPopups, onToggleExpand, search, onSearchChange, filter, onFilterChange }) {
  return (
    <nav className="side-nav">
      <div id="nav-controls">
        <input type="text" id="search-input" placeholder="Search Pokémon..." value={search} onChange={onSearchChange} />
        <select id="type-filter" value={filter} onChange={onFilterChange}>
          <option value="">All Types</option>
          <option value="Electric">Electric</option>
          <option value="Fire">Fire</option>
          <option value="Grass">Grass</option>
          <option value="Water">Water</option>
          <option value="Ghost">Ghost</option>
          <option value="Dragon">Dragon</option>
          <option value="Fighting">Fighting</option>
          <option value="Normal">Normal</option>
          <option value="Psychic">Psychic</option>
          <option value="Steel">Steel</option>
          <option value="Flying">Flying</option>
          <option value="Poison">Poison</option>
          <option value="Ice">Ice</option>
          <option value="Dark">Dark</option>
          <option value="Fairy">Fairy</option>
          <option value="Ground">Ground</option>
          <option value="Rock">Rock</option>
        </select>
      </div>
      <ul id="pokemon-nav">
        {filteredList.map((poke) => {
          const originalIndex = pokemonList.findIndex(p => p.name === poke.name);
          return (
            <PokemonCard
              key={originalIndex}
              poke={poke}
              idx={originalIndex}
              active={activeIndex === originalIndex}
              onClick={() => onSelect(originalIndex)}
              expanded={expandedPopups[originalIndex]}
              onToggleExpand={() => onToggleExpand(originalIndex)}
            />
          );
        })}
      </ul>
    </nav>
  );
}

function Profile({ poke, idx, loading }) {
  const moves = [
    { name: 'Agility', type: 'Psychic', pp: '30/30' },
    { name: 'Dragon Tail', type: 'Dragon', pp: '10/10' },
    { name: 'Slam', type: 'Normal', pp: '20/20' },
    { name: 'Outrage', type: 'Dragon', pp: '10/10' }
  ];

  return (
    <section id="pokemon-profile" className={loading ? 'loading' : ''}>
      <div className="console-frame">
        <div className="profile-header">
          <img src={poke.image} alt={poke.name} className="profile-img" id="profile-img" />
          <div className="profile-info">
            <h2 className="profile-title">{poke.name}</h2>
            <p className="profile-desc">Type: <span className="profile-type">{poke.type}</span></p>
          </div>
        </div>
        <div className="profile-details">
          <div className="profile-stats-chart">
              <StatChart stats={poke.stats} />
          </div>
          {/* profile-stats-box removed (info now shown on per-card hover popup to avoid layout overlap) */}
          <div className="profile-moves">
            {moves.map((m, i) => (
              <div key={i} className="move-row">
                <span className="move-type">{m.type}</span>
                <span className="move-name">{m.name}</span>
                <span className="move-pp">{m.pp}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="profile-info-block">
          <div><strong>Pokédex No:</strong> #{String(idx + 1).padStart(3, '0')}</div>
          <div><strong>Level:</strong> {50 + idx}</div>
          <div><strong>Current Exp:</strong> {(100000 + idx * 5000).toLocaleString()}</div>
          <div><strong>Points to Level Up:</strong> {(10000 + idx * 500).toLocaleString()}</div>
        </div>
        <div className="stats">
          {Object.entries(poke.stats).map(([label, value]) => (
            <div key={label} className="stat">
              <div className="stat-label">{label}</div>
              <div className="stat-value">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedPopups, setExpandedPopups] = useState({});

  const filteredList = pokemonList.filter(poke => {
    const matchesSearch = poke.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = !filter || poke.type.includes(filter);
    return matchesSearch && matchesFilter;
  });

  const handleSelect = (idx) => {
    setLoading(true);
    setTimeout(() => {
      setActiveIndex(idx);
      setLoading(false);
    }, 300); // Simulate load time
  };

  const handleToggleExpand = (idx) => {
    setExpandedPopups(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  useEffect(() => {
    const toggle = document.getElementById('darkModeToggle');
    toggle.addEventListener('change', () => {
      document.body.classList.toggle('light-mode');
    });
  }, []);

  return (
    <main className="main-layout">
      <Profile poke={pokemonList[activeIndex]} idx={activeIndex} loading={loading} />
      <Nav
        pokemonList={pokemonList}
        filteredList={filteredList}
        activeIndex={activeIndex}
        onSelect={handleSelect}
        expandedPopups={expandedPopups}
        onToggleExpand={handleToggleExpand}
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        filter={filter}
        onFilterChange={(e) => setFilter(e.target.value)}
      />
    </main>
  );
}

// Mount React app to single root element to avoid duplicate UI renderings
const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(<App />);
} else {
  // fallback: mount into body if needed
  const fallback = document.createElement('div');
  document.body.appendChild(fallback);
  ReactDOM.createRoot(fallback).render(<App />);
}