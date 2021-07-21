import React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';

function renderWithRouter(component) {
  const history = createMemoryHistory();
  return { ...render(<Router history={ history }>{component}</Router>), history };
}

export default renderWithRouter;
