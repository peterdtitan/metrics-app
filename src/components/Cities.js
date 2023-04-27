import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStates } from '../redux/countries/countriesSlice';

export default function Cities() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(fetchStates({ country: id }));
  }, [dispatch, id]);

  const countryIndex = countries.findIndex((country) => country.country === id);
  const country = countries[countryIndex];
  const { states } = country;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
      {states.map((state) => (
        <motion.div
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.9 }}
          key={state.state}
          className="flex flex-col h-60 p-4 items-center cursor-pointer justify-center bg-red-500 hover:bg-red-600 border-[0.5px] border-slate-700 rounded-md"
        >
          <h2 className="text-2xl font-medium text-center">{state.state.state}</h2>
          <p className="text-xl font-thin">Air Quality Index</p>
          <p className="text-xl font-thin">Carbon Monoxide</p>
        </motion.div>
      ))}
    </div>
  );
}
