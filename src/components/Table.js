import React, { useState } from "react";

const Table = ({ columns, rows, format, perPage }) => {
  const [ page, setPage ] = useState(0);

  const totalRows = rows.length;
  const lastPage = Math.round(totalRows / perPage) - 1
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
        <p>Showing {routeRange} of {totalRows}.</p>
        <button onClick={prevPage}>Prev Page</button>
        <button onClick={nextPage}> Next Page</button>
      </div>
    </div>
  )
};

export default Table;