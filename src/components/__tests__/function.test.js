import { fetchCountries, fetchStates, fetchCities } from '../../redux/countries/countriesSlice';

describe('Redux actions', () => {
  it('fetchCountries should return data from API', async () => {
    const countries = await fetchCountries();
    expect(countries).toBeTruthy();
  });

  it('fetchStates should return data from API', async () => {
    const stateData = await fetchStates({ country: 'United States' });
    expect(stateData).toBeTruthy();
  });

  it('fetchCities should return data from API', async () => {
    const cityData = await fetchCities({ country: 'United States', state: 'California' });
    expect(cityData).toBeTruthy();
  });
});
