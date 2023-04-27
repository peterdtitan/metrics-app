import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import world from '../assets/world-map.png';

export default function Countries() {
  const { countries } = useSelector((state) => state.countries);

  return (
    <div className="flex flex-col w-screenfont-montserrat">
      <div className="flex flex-col md:flex-row p-4 gap-y-4 h-80 items-center justify-evenly bg-red-500">
        <img src={world} alt="world-map" className="h-60" />
        <div className="flex flex-col">
          <h1 className="text-4xl font-medium">World&apos;s Air Quality</h1>
          <p className="text-2xl font-thin">Select a country to view air quality metrics</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 p-2">
        {countries.map((country) => (
          <Link to={`/country/${country.country}`} key={country.country}>
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.9 }}
              className="h-40 cursor-pointer rounded-md bg-cover bg-no-repeat opacity-95"
              style={{ backgroundImage: `url(${world})` }}
            >
              <div
                className="bg-red-500 p-4 h-40 hover:bg-red-600/90 justify-center flex flex-col rounded-md items-center z-10"
              >
                <h2 className="text-2xl font-semibold text-center">{country.country}</h2>
                {country.states.length !== 1 ? (
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-xl font-thin text-center">
                      {country.states.length}
                      {' '}
                      states
                    </p>
                    <p className="font-thin italic p-1 text-sm text-white bg-black rounded-md">Opened</p>
                  </div>
                ) : null }
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
