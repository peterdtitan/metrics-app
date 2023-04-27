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
      });
  },
});

export default countriesSlice.reducer;
