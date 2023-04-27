import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Countries() {
  const { countries } = useSelector((state) => state.countries);

  return (
    <div className="flex flex-col w-screenfont-montserrat">
      <div className="flex flex-col h-80 items-center justify-center bg-red-500">
        <h1 className="text-4xl font-medium">World&apos;s Air Quality</h1>
        <p className="text-2xl font-thin">Select a country to view air quality metrics</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
        {countries.map((country) => (
          <Link to={`/country/${country.country}`} key={country.country}>
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col h-60 p-4 items-center cursor-pointer justify-center bg-red-500 hover:bg-red-600 border-[0.5px] border-slate-700 rounded-md"
            >
              <h2 className="text-2xl font-medium text-center">{country.country}</h2>
              <p className="text-xl font-thin">Air Quality Index</p>
              <p className="text-xl font-thin">Carbon Monoxide</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
