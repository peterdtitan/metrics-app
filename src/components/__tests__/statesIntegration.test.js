import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider, useSelector } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Country from '../States';
import store from '../../redux/store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('Country component', () => {
  beforeEach(() => {
    useSelector.mockImplementation((callback) => callback({
      countries: {
        countries: [
          { country: 'Country1', states: [] },
          { country: 'Country2', states: [] },
        ],
      },
    }));
  });

  afterEach(() => {
    useSelector.mockClear();
  });

  it('renders the states for the selected country', async () => {
    const countryId = 'Country1';
    const states = [
      { state: 'State1' },
      { state: 'State2' },
    ];
    useSelector.mockImplementation((callback) => callback({
      countries: {
        countries: [
          { country: 'Country1', states },
        ],
      },
    }));

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/country/${countryId}`]}>
          <Routes>
            <Route path="/country/:countryId" element={<Country />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const countryName = await screen.findByText(`${countryId}'s Air Quality`);
    expect(countryName).toBeInTheDocument();

    const stateLinks = await screen.findAllByRole('link');
    expect(stateLinks).toHaveLength(2);
    expect(stateLinks[0]).toHaveTextContent('State1');
    expect(stateLinks[1]).toHaveTextContent('State2');
  });
});
