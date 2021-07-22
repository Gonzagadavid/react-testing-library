import { cleanup, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { Pokedex } from '../components';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
  acc[pokemon.id] = false;
  return acc;
}, {});

const pokemonNames = pokemons.map(({ name }) => name);
const last = pokemonNames.length - 1;
const pokemonTypes = [...new Set(pokemons.map((pokemon) => pokemon.type))];
const pokemonsPsy = pokemons
  .filter(({ type }) => type === 'Psychic')
  .map(({ name }) => name);

describe('testa a renderização e o funcionamento do componente Pokedex', () => {
  beforeEach(() => renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavorite } />,
  ));

  afterEach(cleanup);

  it('verifica se rederiza um h2 com o texto "Encountered pokémons"', () => {
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Encountered pokémons');
  });

  it('verifica o funcionamento do botão de próximo da lista', () => {
    const nextBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
    pokemonNames.forEach((name, index) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(name);

      if (index < last) fireEvent.click(nextBtn);
      const pokemonImg = screen.getAllByRole('img');
      expect(pokemonImg).toHaveLength(1);
    });

    fireEvent.click(nextBtn);
    const firstPokemon = screen.getByText(pokemonNames[0]);
    expect(firstPokemon).toBeInTheDocument();
  });

  it('verifica o funcionamento de um botão para cada tipo de pokemon', () => {
    const nextBtn = screen.getByTestId('next-pokemon');
    const buttonsType = screen.getAllByTestId('pokemon-type-button');
    expect(buttonsType).toHaveLength(pokemonTypes.length);

    pokemonTypes.forEach((type) => {
      const qty = pokemons.filter((pokemon) => pokemon.type === type) + 1;
      const btnType = screen.getByRole('button', { name: type });

      fireEvent.click(btnType);

      Array(qty).fill(0).forEach(() => {
        const pokemonType = screen.getByTestId('pokemon-type');
        expect(pokemonType).toHaveTextContent(type);
        fireEvent.click(nextBtn);
      });
    });
  });

  it('verifica o funcionamento do botão all', () => {
    const nextBtn = screen.getByTestId('next-pokemon');
    const btnAll = screen.getByRole('button', { name: 'All' });
    const btnPsy = screen.getByRole('button', { name: 'Psychic' });

    expect(btnAll).toBeInTheDocument();
    const checkAll = (array) => array.forEach((name) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(name);
      fireEvent.click(nextBtn);
    });

    checkAll(pokemonNames);

    fireEvent.click(btnPsy);
    checkAll(pokemonsPsy);

    fireEvent.click(btnAll);
    checkAll(pokemonNames);
  });
});
