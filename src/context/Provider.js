import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import starWarsApi from '../services/starWarsApi';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    starWarsApi().then((response) => {
      setData(response);
    });
  }, []);
  return (
    <Context.Provider value={ { data } }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.string,
}.isRequired;

export default Provider;
