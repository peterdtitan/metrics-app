import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStates } from '../redux/countries/countriesSlice';

export default function Country() {
  const { countryId } = useParams();
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(fetchStates({ country: countryId }));
  }, [dispatch, countryId]);

  const countryIndex = countries.findIndex((country) => country.country === countryId);
  const country = countries[countryIndex];
  const { states } = country;
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col h-80 items-center justify-center bg-red-500">
        <h1 className="text-4xl font-medium">
          {countryId}
          &apos;s Air Quality
        </h1>
        <p className="text-2xl font-thin w-[40%]">
          Below you can find a list of the states in
          <span className="font-medium">
            {' '}
            {countryId}
          </span>
          . There are
          {' '}
          <span className="font-medium">
            {' '}
            {states.length}
            {' '}
            states in total.
          </span>
          {' '}
          Select a state to view the cities and air metrics for each city.
        </p>
        <button type="button" onClick={goBack} className="p-2 mt-6 bg-black text-white rounded-sm hover:bg-white hover:text-black">
          Back to Countries
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
        {states.map((state) => (
          <Link to={`/country/${countryId}/${state.state}`} key={state.state}>
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.9 }}
              key={state.state}
              className="flex flex-col h-60 p-4 items-center cursor-pointer justify-center bg-red-500 hover:bg-red-600 border-[0.5px] border-slate-700 rounded-md"
            >
              <h2 className="text-2xl font-medium text-center">{state.state}</h2>
              <p className="text-xl font-thin">Air Quality Index</p>
              <p className="text-xl font-thin">Carbon Monoxide</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
