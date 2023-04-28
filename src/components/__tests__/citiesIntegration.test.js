import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Cities from '../Cities';
import store from '../../redux/store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Cities component', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockImplementation((callback) => callback({
      countries: {
        countries: [
          {
            country: 'Country1',
            states: [
              {
                state: 'State1',
                cities: [
                  { city: 'City1' },
                  { city: 'City2' },
                ],
              },
            ],
          },
        ],
      },
    }));
  });

  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
  });

  it('renders the cities for the selected state', async () => {
    const countryId = 'Country1';
    const stateId = 'State1';

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/country/${countryId}/${stateId}`]}>
          <Routes>
            <Route path="/country/:countryId/:stateId" element={<Cities />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const countryName = await screen.findByText(new RegExp(`${stateId}\\s*'s\\s+Air\\s+Quality`));
    expect(countryName).toBeInTheDocument();

    const cities = await screen.findAllByRole('link');
    expect(cities).toHaveLength(2);
    expect(cities[0]).toHaveTextContent('City1');
    expect(cities[1]).toHaveTextContent('City2');

    await waitFor(() => {
      expect(useDispatch).toHaveBeenCalled();
      expect(useSelector).toHaveBeenCalled();
    });
  });
});
