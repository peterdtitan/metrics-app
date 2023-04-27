import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  countries: [],
  status: 'idle',
  error: null,
};

export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
  const response = await fetch('https://api.airvisual.com/v2/countries?key=4a57d4bd-1893-4b25-bcb9-a359b6da528a');
  const data = await response.json();
  const countries = data.data.map((country) => ({
    ...country,
    country: country.country || country.name,
    states: [
      {
        state: '',
        cities: [
          {
            city: '',
            info: {},
          },
        ],
      },
    ],
  }));
  return countries;
});

export const fetchStates = createAsyncThunk(
  'states/fetchStates',
  async ({ country }) => {
    const response = await fetch(
      `https://api.airvisual.com/v2/states?country=${country}&key=4a57d4bd-1893-4b25-bcb9-a359b6da528a`,
    );
    const data = await response.json();
    const states = data.data.map((state) => ({ state: state.state, cities: [] }));
    return { states, country };
  },
);

export const fetchCities = createAsyncThunk(
  'cities/fetchCities',
  async ({ country, state }) => {
    const response = await fetch(
      `https://api.airvisual.com/v2/cities?state=${state}&country=${country}&key=4a57d4bd-1893-4b25-bcb9-a359b6da528a`,
    );
    const data = await response.json();
    const cities = data.data.map((city) => ({
      city: city.city,
      info: '',
    }));
    return { cities, country, state };
  },
);

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchCountries.fulfilled, (state, action) => {
        const { payload } = action;
        return {
          ...state,
          status: 'succeeded',
          countries: payload,
        };
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        const { error } = action;
        return {
          ...state,
          status: 'failed',
          error: error.message,
        };
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        const { states, country } = action.payload;
        const countryIndex = state.countries.findIndex((c) => c.country === country);
        if (countryIndex !== -1) {
          return {
            ...state,
            countries: [
              ...state.countries.slice(0, countryIndex),
              {
                ...state.countries[countryIndex],
                states,
              },
              ...state.countries.slice(countryIndex + 1),
            ],
          };
        }
        return state;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        const { cities, country, state: stateName } = action.payload;
        const countryIndex = state.countries.findIndex((c) => c.country === country);
        if (countryIndex !== -1) {
          const stateIndex = state.countries[countryIndex].states.findIndex(
            (s) => s.state === stateName,
          );
          if (stateIndex !== -1) {
            return {
              ...state,
              countries: [
                ...state.countries.slice(0, countryIndex),
                {
                  ...state.countries[countryIndex],
                  states: [
                    ...state.countries[countryIndex].states.slice(0, stateIndex),
                    {
                      ...state.countries[countryIndex].states[stateIndex],
                      cities,
                    },
                    ...state.countries[countryIndex].states.slice(stateIndex + 1),
                  ],
                },
                ...state.countries.slice(countryIndex + 1),
              ],
            };
          }
        }
        return state;
      });
  },
});

export default countriesSlice.reducer;
