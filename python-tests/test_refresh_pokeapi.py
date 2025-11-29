import os
import json

import scripts.refresh_pokeapi as rp


def test_fetch_pokemon_monkeypatched(monkeypatch, tmp_path):
    # fake fetch_url that returns a small predictable dataset
    def fake_fetch_url(path):
        if path.startswith('/pokemon?'):
            return {'results': [{'name': 'bulbasaur', 'url': '/pokemon/1'}]}
        elif path == '/pokemon/1':
            return {
                'id': 1,
                'name': 'bulbasaur',
                'height': 7,
                'weight': 69,
                'base_experience': 64,
                'types': [{'type': {'name': 'grass'}}],
                'abilities': [{'ability': {'name': 'overgrow'}}],
                'sprites': {'other': {'official-artwork': {'front_default': 'https://example.com/a.png'}}}
            }
        return {}

    monkeypatch.setattr(rp, 'fetch_url', fake_fetch_url)
    out = rp.fetch_pokemon(1)
    assert isinstance(out, list)
    assert len(out) == 1
    p = out[0]
    assert p['id'] == 1
    assert p['name'] == 'bulbasaur'
    assert 'height' in p and 'weight' in p and 'sprite' in p

    # test writing via main
    out_file = tmp_path / 'pokemon.json'
    rp.main(['--limit', '1', '--out', str(out_file)])
    assert out_file.exists()
    data = json.loads(out_file.read_text(encoding='utf-8'))
    assert data['count'] == 1
    assert data['pokemon'][0]['name'] == 'bulbasaur'
