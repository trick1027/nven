import React from "react";

const Pagination = ({perPage, total, currPage, paginate}) => {
  const pageNumbers = [];

  for ( let inx=1; inx <= Math.ceil(total/perPage); inx++) {
    pageNumbers.push(inx);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pageNumbers.map(num => (
          <li key={num} className="page-item">
            <a onClick={() => paginate(num)} className="page-link" 
              style={currPage == num ? {color: '#17a2b8'}: null}>
              {num}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination;