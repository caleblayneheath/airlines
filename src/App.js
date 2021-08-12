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

const Table = ({tableData}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            airline
          </th>
          <th>
            source
          </th>
          <th>
            dest
          </th>
        </tr>
      </thead>
      <tbody>
        {tableData.map(({airline, src, dest}) => {
          return (
            <tr key={`${airline}${src}${dest}`}>
              <td>{getAirlineById(airline)}</td>
              <td>{getAirportByCode(src)}</td>
              <td>{getAirportByCode(dest)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const App = () => (
  <div className="app">
  <header className="header">
    <h1 className="title">Airline Routes</h1>
  </header>
  <section>
    <p>
      Welcome to the app!
    </p>
    <Table tableData={routes} />
  </section>
</div>
)

export default App;