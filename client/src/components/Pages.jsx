// import React from "react";

// export default function Pages ({ videogamesPerPage, allVideogames, pages }){
//     const pageNumbers = [];
//     for (let i = 0; i <= Math.ceil(allVideogames / videogamesPerPage) ; i++) {
//         pageNumbers.push(i);        
//     };
//     return(
//         <nav>
//             <ul className = "pages">
//                 { pageNumbers && pageNumbers.map(number => {
//                     <li className = "number" key = { number }>
//                         <a onClick={() => pages(number)}> { number } </a> 
//                     </li>
//                 })}
//             </ul>
//         </nav>
//     );
// }


// CGPT

import React from "react";

export default function Pages({ videogamesPerPage, allVideogames, pages }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pages">
        {pageNumbers.map((number) => (
          <li className="number" key={number}>
            <a onClick={() => pages(number)}> {number} </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
