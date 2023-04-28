import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Info from '../Info';

describe('Info component', () => {
  it('renders the component', async () => {
    const countryId = 'Country1';
    const stateId = 'State1';
    const cityId = 'City1';

    const mockData = {
      data: {
        location: {
          coordinates: [40, -73],
        },
        current: {
          weather: {
            temperature: 20,
            pressure: 1000,
            humidity: 50,
          },
        },
      },
    };

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    render(
      <MemoryRouter initialEntries={[`/country/${countryId}/${stateId}/${cityId}`]}>
        <Routes>
          <Route path="/country/:countryId/:stateId/:cityId" element={<Info />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText(cityId)).toBeInTheDocument();
    expect(await screen.findByText(`${stateId}, ${countryId}`)).toBeInTheDocument();
    expect(await screen.findByText(`Lat: ${mockData.data.location.coordinates[0]}`)).toBeInTheDocument();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(`https://api.airvisual.com/v2/city?city=${cityId}&state=${stateId}&country=${countryId}&key=392bf691-dca6-4164-b5cc-c70cfe7acd3d`);
    });
  });
});
