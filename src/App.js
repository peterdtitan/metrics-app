import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { fetchCountries } from './redux/countries/countriesSlice';
import Countries from './components/Countries';
import States from './components/States';
import Cities from './components/Cities';

function App() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.countries);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCountries());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  return (
    <div className="bg-red-300">
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="/country/:id" element={<States />} />
        <Route path="/country/:id/:id" element={<Cities />} />
      </Routes>
    </div>
  );
}

export default App;
