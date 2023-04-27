import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsArrowRightCircle } from 'react-icons/bs';
import world from '../assets/world-map.png';

export default function Countries() {
  const { countries } = useSelector((state) => state.countries);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = countries.filter(
    (country) => country.country.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col w-screenfont-montserrat">
      <div className="flex flex-col md:flex-row p-4 pb-10 md:pb-0 gap-y-4 h-[450px] gap-10  items-center justify-evenly bg-red-500">
        <img src={world} alt="world-map" className="h-60" />
        <div className="flex flex-col w-[50%]">
          <h1 className="text-4xl font-medium">World&apos;s Air Quality</h1>
          <p className="text-2xl font-thin">
            Below you can find a list of the countries in the world. There are
            {' '}
            <span className="font-medium">
              {countries.length}
              {' '}
              countries
            </span>
            {' '}
            in total which support the drive towards quality Air and provide data metrics.
          </p>
          <p className="text-2xl font-thin">Select a country to view air quality metrics</p>
          <input
            type="text"
            placeholder="Search country"
            value={searchQuery}
            onChange={handleSearch}
            className="mt-4 p-2 rounded-md border-[1px]border-red-600 focus:outline-red-600"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 p-2">
        {filteredCountries.map((country) => (
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
                <div className="flex gap-4">
                  <h2 className="text-2xl font-semibold text-center">{country.country}</h2>
                  <BsArrowRightCircle className="text-4xl text-black" />

                </div>
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
