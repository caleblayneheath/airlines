import React, { Component } from 'react';
import './App.css';

// import data from './data.js'
const { 
  routes, 
  airlines, 
  airports, 
  getAirlineById, 
  getAirportByCode 
} = require('./data.js')

const Table = ({ columns, rows, format }) => {
  return (
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
        {rows.map(row => {
          return (
            <tr key={Object.values(row).join()}>
              {
                Object.entries(row).map(([k, v], _) => {
                  return (<td key={k+v}>{format(k, v)}</td>)
                })
              }
            </tr>
          )
        })}
      </tbody>
    </table>
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
    />
  </section>
</div>
)

export default App;