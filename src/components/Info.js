import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Info() {
  const { countryId, stateId, cityId } = useParams();
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const response = await fetch(
        `https://api.airvisual.com/v2/city?city=${cityId}&state=${stateId}&country=${countryId}&key=392bf691-dca6-4164-b5cc-c70cfe7acd3d`,
      );
      const data = await response.json();

      if (isMounted) {
        setInfo(data.data);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      setLoading(false);
    };
  }, [countryId, stateId, cityId]);

  function goBack() {
    navigate(-1);
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-4 h-screen items-center justify-center font-montserrat">
      <div className="flex flex-col items-center justify-start h-[550px] w-[500px] bg-white rounded-md">
        <div className="flex flex-col p-4 items-center gap-2 bg-slate-100 justify-center border-b-[0.5px] border-slate-300 w-full">
          <p className="text-2xl">{cityId}</p>
          <p className="text-sm text-slate-500">
            <span className="px-1 rounded-full bg-black/90 text-white">
              {stateId}
              ,
              {' '}
              {countryId}
            </span>
          </p>
          <div className="flex justify-between text-sm gap-4 px-8 text-slate-500">
            {info?.location?.coordinates ? (
              <div className="flex items-center gap-2">
                <p className="px-1 bg-slate-300 text-slate-600 rounded-full text-[7px]">
                  Lat:
                  {' '}
                  {info.location.coordinates[0]}
                </p>
                <p className="px-1 bg-slate-300 text-slate-600 rounded-full text-[7px]">
                  Lat:
                  {' '}
                  {info.location.coordinates[1]}
                </p>
              </div>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4 items-center justify-center bg-blue-200 w-[80%] rounded-md p-4">
          <h1 className="text-md p-1 rounded-md bg-blue-400 text-white">Weather Stats</h1>
          <div className="grid md:grid-cols-4 gap-2 p-2 w-full rounded-md bg-blue-100 text-xs">
            {info?.current?.weather ? (
              Object.entries(info.current.weather).map(([key, value]) => (
                <p key={key} className="p-1 rounded-full bg-blue-300 text-blue-700">
                  {key.toUpperCase()}
                  :
                  {' '}
                  {value.length > 5 ? value.slice(0, 5) : value}
                </p>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4 items-center justify-center bg-red-200 w-[80%] rounded-md p-4">
          <h1 className="text-md p-1 rounded-md bg-red-400 text-white">Pollution Stats</h1>
          <div className="grid md:grid-cols-4 gap-2 p-2 w-full rounded-md bg-red-100 text-xs">
            {info?.current?.pollution ? (
              Object.entries(info.current.pollution).map(([key, value]) => (
                <p key={key} className="p-1 rounded-full bg-red-300 text-red-700">
                  {key.toUpperCase()}
                  :
                  {' '}
                  {value.length > 5 ? value.slice(0, 5) : value}
                </p>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
        <button
          type="button"
          className="p-2 mt-6 bg-black text-white rounded-sm hover:text-red-400"
          onClick={goBack}
        >
          Back
        </button>
      </div>
    </div>
  );
}
