import { render, screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';

describe('testa a renderização e about', () => {
  const pokedexImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

  it('verifica se os elementos do About está renderizando corretamente', () => {
    render(<About />);

    const titulo = screen.getByRole('heading', { level: 2 });
    expect(titulo).toHaveTextContent('About Pokédex');

    const paragrafos = screen.getAllByText(/pokémon/i);
    expect(paragrafos).toHaveLength(2);

    const img = screen.getByRole('img');
    expect(img).toHaveProperty('src', pokedexImg);
  });
});
