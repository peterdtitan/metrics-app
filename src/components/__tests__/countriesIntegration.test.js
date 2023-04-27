import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Countries from '../Countries';
import store from '../../redux/store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('Countries component', () => {
  beforeEach(() => {
    useSelector.mockImplementation((callback) => callback({ countries: { countries: [] } }));
  });

  afterEach(() => {
    useSelector.mockClear();
  });

  it('renders countries list', async () => {
    useSelector.mockImplementation((callback) => callback({
      countries: {
        countries: [
          { country: 'Country1', states: [] },
          { country: 'Country2', states: [] },
        ],
      },
    }));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Countries />
        </MemoryRouter>
      </Provider>,
    );

    const countryLinks = await screen.findAllByRole('link');
    expect(countryLinks).toHaveLength(2);
    expect(countryLinks[0]).toHaveTextContent('Country1');
    expect(countryLinks[1]).toHaveTextContent('Country2');
  });

  it('filters countries by search query', async () => {
    useSelector.mockImplementation((callback) => callback({
      countries: {
        countries: [
          { country: 'Country1', states: [] },
          { country: 'Country2', states: [] },
        ],
      },
    }));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Countries />
        </MemoryRouter>
      </Provider>,
    );

    const searchInput = await screen.findByPlaceholderText('Search country');
    expect(searchInput).toBeInTheDocument();

    searchInput.value = '2';
    searchInput.dispatchEvent(new InputEvent('input'));

    const countryLinks = await screen.findAllByRole('link');
    expect(countryLinks).toHaveLength(2);
    expect(countryLinks[0]).toHaveTextContent('Country10 statesOpened');
  });
});
