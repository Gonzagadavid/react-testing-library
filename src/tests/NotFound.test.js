import { screen, render } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../components';

describe('testa a renderização do Componente NotFound', () => {
  const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

  it('verifica se os elementos renderizam corretamente', () => {
    render(<NotFound />);

    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/Page requested not found/i);

    const img = screen.getByAltText(/Pikachu crying/i);
    expect(img).toHaveProperty('src', imgSrc);
  });
});
