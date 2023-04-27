import React from 'react';
import { useParams } from 'react-router-dom';

export default function Info() {
  const { countryId, stateId, cityId } = useParams();
  return (
    <div className="flex flex-col items-center justify-center">
      Welcome to the info page of
      {cityId}
      {' '}
      in
      {countryId}
      {' '}
      which is of state
      {stateId}
    </div>
  );
}
