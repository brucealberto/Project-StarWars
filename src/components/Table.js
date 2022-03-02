import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import './Table.css';

function Table() {
  const {
    data,
    setFilterByName,
    setData,
    defaultPlanets,
    filterByNumericValues,
    setFilterByNumericValues,
  } = useContext(Context);
  const [filter, setFilter] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [columnArray, setColumnArray] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  useEffect(() => {
    // const {column, comparison, value } = filterByNumericValues;
    let array = [];
    filterByNumericValues.forEach((filterParams) => {
      array = data.filter((planet) => {
        if (filterParams.comparison === 'maior que') {
          return +planet[filterParams.column] > +filterParams.value;
        }

        if (filterParams.comparison === 'menor que') {
          return +planet[filterParams.column] < +filterParams.value;
        }

        return +planet[filterParams.column] === +filterParams.value;
      });
    });
    setData(array);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByNumericValues]);

  const handleChange = ({ target }) => {
    setFilter(target.value);
    setFilterByName({ name: filter });
    const results = data.filter((planet) => planet.name
      .toLowerCase().includes(target.value.toLowerCase()));
    setData(results);
    if (!target.value) {
      setData(defaultPlanets);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    const filterArray = columnArray.filter((col) => col !== column);
    setColumnArray(filterArray);
    setFilterByNumericValues([
      ...filterByNumericValues,
      {
        column,
        comparison,
        value,
      },
    ]);
  };

  return (
    <>
      <input
        type="text"
        name="filter"
        placeholder="Escolha o Planeta"
        value={ filter }
        onChange={ handleChange }
        data-testid="name-filter"
      />

      <select
        data-testid="column-filter"
        onChange={ ({ target }) => setColumn(target.value) }
      >
        {columnArray.map((numericColumn) => (
          <option key={ numericColumn } value={ numericColumn }>
            {numericColumn}
          </option>
        ))}
        {/* <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option> */}
      </select>

      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => setComparison(target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        value={ value }
        onChange={ ({ target }) => setValue(+target.value) }
        data-testid="value-filter"
      />

      <button type="submit" onClick={ handleClick } data-testid="button-filter">
        Filtrar
      </button>

      <table className="Table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>SurfaceWater</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {data.map((info) => (
            <tr key={ info.name }>
              <td>{info.name}</td>
              <td>{info.rotation_period}</td>
              <td>{info.orbital_period}</td>
              <td>{info.diameter}</td>
              <td>{info.climate}</td>
              <td>{info.gravity}</td>
              <td>{info.terrain}</td>
              <td>{info.surface_water}</td>
              <td>{info.population}</td>
              <td>{info.films}</td>
              <td>{info.created}</td>
              <td>{info.edited}</td>
              <td>{info.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;

// name, rotation_period, orbital_period, diameter, climate, gravity, terrain, surface_water, population, films, created, edited, url}
