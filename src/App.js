import React, { Component, useState } from "react";
import "./App.css";
import Select from "./components/Select";
import Table from "./components/Table";
import DATA from "./data.js";


const App = () => {
  const [ airline, setAirline ] = useState("all");
  const [ airport, setAirport ] = useState("all");
  
  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];

  const formatValue = (property, value) => { 
    let func;
    switch (property) {
      case "airline":
        func = DATA.getAirlineById
        break;
      case "src":
      case "dest":
        func = DATA.getAirportByCode
        break;
    }
    return func(value).name;
  }

  const filteredRoutes = (() => {
    return DATA.routes.filter(route => {
      return (
        (route.airline === airline || airline === "all") &&
        (route.src === airport || route.dest === airport || airport === "all")
      );
    })
  })();

  const activeAirlines = new Set(filteredRoutes.map(({airline}) => airline));
  const activeAirports = new Set(
    filteredRoutes.map(({src}) => src)
      .concat(filteredRoutes.map(({dest}) => dest))
  );

  const filteredAirlines = DATA.airlines.map(airline => {
    const newAirline = {...airline};
    if (activeAirlines.has(airline.id)) {
      newAirline.active = true;
    }
    return newAirline;
  });

  const filteredAirports = DATA.airports.map(airport => {
    debugger;
    const newAirport = {...airport};
    if (activeAirports.has(airport.code)) {
      newAirport.active = true;
    }
    return newAirport;
  });

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
 
  const defaultsSelected = airline === "all" && airport === "all";

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          Show routes on {airlineSelector} flying in or out of {airportSelector}
          <button disabled={defaultsSelected} onClick={clearFilters}>Show All Routes</button>
        </p>
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