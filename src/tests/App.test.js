import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testa renderização e funcionamento do componente App', () => {
  it('verifica se aplicação possui os link de navegação com a url correta', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();

    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();

    const favorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favorites).toBeInTheDocument();

    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');

    fireEvent.click(favorites);
    expect(history.location.pathname).toBe('/favorites');

    history.push('/nao-existe');
    expect(screen.getByAltText(/Pikachu crying/i)).toBeInTheDocument();

    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });
});
