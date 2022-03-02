import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import starWarsApi from '../services/starWarsApi';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [defaultPlanets, setDefaultPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  useEffect(() => {
    starWarsApi().then((response) => {
      setData(response);
      setDefaultPlanets(response);
    });
  }, []);
  return (
    <Context.Provider
      value={ {
        data,
        filterByName,
        setFilterByName,
        setData,
        defaultPlanets,
        filterByNumericValues,
        setFilterByNumericValues,
      } }
    >
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.string,
}.isRequired;

export default Provider;
