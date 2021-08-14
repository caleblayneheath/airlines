import React, { Component, useState } from 'react';
import './App.css';

const { 
  routes, 
  airlines, 
  airports, 
  getAirlineById, 
  getAirportByCode 
} = require('./data.js')

const Table = ({ columns, rows, format, perPage }) => {
  const [ page, setPage ] = useState(0);

  const totalRoutes = rows.length;
  const lastPage = Math.round(totalRoutes / perPage) - 1
  const rowsToShow = rows.slice(page * perPage, (page + 1) * perPage);
  const routeRange = `${(page * perPage) + 1} - ${(page * perPage) + rowsToShow.length}`;

  const nextPage = () => {
    if (page < lastPage) {
      setPage(page + 1);
    }
  }

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  }

  return (
    <div>    
      <table>
        <thead>
          <tr>
            {
              columns.map(({ name, property }) => (
                <th key={property}>{name}</th>)
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            rowsToShow.map(row => {
              return (
                <tr key={Object.values(row).join()}>
                  {
                    Object.entries(row).map(([k, v], _) => {
                      return (<td key={k+v}>{format(k, v)}</td>)
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div>
        <p>Showing {routeRange} of {totalRoutes}.</p>
        <button onClick={prevPage}>Prev Page</button>
        <button onClick={nextPage}> Next Page</button>
      </div>
    </div>
  )
}

const formatValue = (property, value) => { 
  let func;
  switch (property) {
    case "airline":
      func = getAirlineById
      break;
    case "src":
    case "dest":
      func = getAirportByCode
      break;
  }
  return func(value).name;
}

const columns = [
  {name: 'Airline', property: 'airline'},
  {name: 'Source Airport', property: 'src'},
  {name: 'Destination Airport', property: 'dest'},
];

const Select = (props) => {
  const { options, valueKey, titleKey, allTitle, value, onSelect } = props;
  return (
    <select value={value} onChange={(event) => onSelect(event.target.value)}>
      <option value="all">
        {allTitle}
      </option>
      {
        options.map(option => {
          return (
            <option 
              key={option[valueKey]}
              value={option[valueKey]}
            >
              {option[titleKey]}
            </option>
          );
        })
      }
    </select>
  );
}

const filteredAirlines = airlines;
const filteredAirports = airports;

const App = () => {
  const [ airline, setAirline ] = useState("all");
  const [ airport, setAirport ] = useState("all");

  const filteredRoutes = (() => {
    return routes.filter(route => {
      return (
        (route.airline === airline || airline === "all") &&
        (route.src === airport || route.dest === airport || airport === "all")
      );
    })
  })();

  const airlineSelected = (value) => {
    if (value !== "all") {
      value = Number(value)
    }
    setAirline(value);
  };

  const airportSelected = (value) => {
    setAirport(value);
  };

  const clearFilters = () => {
    setAirline("all"); 
    setAirport("all");
  };

  const airlineSelector = (
    <Select  
      options={filteredAirlines}
      valueKey="id"
      titleKey="name"
      allTitle="All Airlines"
      onSelect={airlineSelected}
      value={airline}
    />
  );

  const airportSelector = (
    <Select
      options={filteredAirports}
      valueKey="code"
      titleKey="name"
      allTitle="All Airports"
      onSelect={airportSelected}
      value={airport}
    />
  );
  

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>Show routes on {airlineSelector} flying in or out of {airportSelector}</p>
        <button onClick={clearFilters}>Show All Routes</button>
        <Table 
          className="routes-table" 
          columns={columns} 
          rows={filteredRoutes}
          format={formatValue}
          perPage={25}
        />
      </section>
    </div>
  );
};

export default App;