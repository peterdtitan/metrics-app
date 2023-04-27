import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities } from '../redux/countries/countriesSlice';

export default function Cities() {
  const { countryId, stateId } = useParams();
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(fetchCities({ country: countryId, state: stateId }));
  }, [countryId, dispatch, stateId]);

  const countryIndex = countries.findIndex((country) => country.country === countryId);
  const country = countries[countryIndex];
  const stateIndex = country.states.findIndex((state) => state.state === stateId);
  const state = country.states[stateIndex];
  const { cities } = state;
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col h-80 items-center justify-center bg-red-500">
        <h1 className="text-4xl font-medium">
          Welcome to
          {' '}
          {stateId}
          &apos;s Air Quality
        </h1>
        <p className="text-2xl font-thin w-[40%]">
          Below you can find a list of the cities in
          <span className="font-medium">
            {' '}
            {stateId}
          </span>
          . There are
          {' '}
          <span className="font-medium">
            {' '}
            {cities.length}
            {' '}
            cities in total.
          </span>
          {' '}
          Each city has a unique air data metric available to it.
        </p>
        <button type="button" onClick={goBack} className="p-2 mt-6 bg-black text-white rounded-sm hover:bg-white hover:text-black">
          Back to States
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 p-2">
        {cities.map((city) => (
          <Link to={`/country/${countryId}/${stateId}/${city.city}`} key={city.city}>
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.9 }}
              key={state.state}
              className="h-60 cursor-pointer rounded-md"
            >
              <div className="bg-red-500/80 p-4 h-60 hover:bg-red-600/80 justify-center flex flex-col rounded-md items-center">
                <h2 className="text-2xl font-medium text-center">{city.city}</h2>
                <p className="text-xl font-thin">Air Quality Index</p>
                <p className="text-xl font-thin">Carbon Monoxide</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
