import React from 'react';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pokemon = pokemons[0];
const { averageWeight, image, name, id, type } = pokemon;
const { measurementUnit, value } = averageWeight;

describe('testa a renderização e o funcionamento do componente Pokemon', () => {
  afterEach(cleanup);

  it('verifica se renderiza as informações corretas sobre um determinado pokemon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);

    const weightText = `Average weight: ${value} ${measurementUnit}`;

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(name);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(type);

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent(weightText);

    const img = screen.getByAltText(`${name} sprite`);
    expect(img).toBeInTheDocument();
    expect(img).toHaveProperty('src', image);
  });

  it('verifica se quando favorito exibe a marcação', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
    const altFavorite = `${name} is marked as favorite`;
    const iconPath = 'http://localhost/star-icon.svg';
    const favorite = screen.queryByAltText(altFavorite);
    expect(favorite).toBeInTheDocument();
    expect(favorite).toHaveProperty('src', iconPath);
  });

  it('verifica se quando não favorito não exibe a marcação', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
    const altFavorite = `${name} is marked as favorite`;
    const favorite = screen.queryByAltText(altFavorite);
    expect(favorite).not.toBeInTheDocument();
  });

  it('verifica se o link leva para url de acordo com o pokemon exibido', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
    const link = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  it('verifica se ao clicar no link details a página de detalhes é renderizada', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'More details' });

    fireEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);

    const title = screen.getByRole('heading', { name: `${name} Details` });
    expect(title).toBeInTheDocument();
  });
});
