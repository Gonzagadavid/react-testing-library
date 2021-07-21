import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('testa a redenrização e funcionamento do componente FavoritesPokemons', () => {
  afterEach(cleanup);

  const pokemon1 = pokemons[0];
  const pokemon2 = pokemons[1];
  const favoritesPokemons = [pokemon1, pokemon2];

  it('verifica se renderiza "No favorite pokemon found" se não houver favoritos', () => {
    render(<FavoritePokemons pokemons={ [] } />);
    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  it('verifica se os dois pokemons favoritos  são renderizado na tela', () => {
    renderWithRouter(<FavoritePokemons pokemons={ favoritesPokemons } />);
    const name1 = pokemon1.name;
    const name2 = pokemon2.name;
    const favoriteName1 = screen.getByText(name1);
    const favoriteName2 = screen.getByText(name2);

    expect(favoriteName1).toBeInTheDocument();
    expect(favoriteName2).toBeInTheDocument();
  });
});
