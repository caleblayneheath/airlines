import React, { Component, useState } from 'react';
import './App.css';

// import data from './data.js'
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
  return func(value)
}

const columns = [
  {name: 'Airline', property: 'airline'},
  {name: 'Source Airport', property: 'src'},
  {name: 'Destination Airport', property: 'dest'},
];

const App = () => (
  <div className="app">
  <header className="header">
    <h1 className="title">Airline Routes</h1>
  </header>
  <section>
    <p>
      Welcome to the app!
    </p>
    <Table 
      className="routes-table" 
      columns={columns} 
      rows={routes}
      format={formatValue}
      perPage={25}
    />
  </section>
</div>
)

export default App;