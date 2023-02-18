import React from 'react'

function Pagination(props) {
  const { totalItems, ItemsPerPage } = props;


  const totalPages = Number(totalItems) / Number(ItemsPerPage);
  const pagesArray = [...Array(Math.round(totalPages))];
  return (
    <div>
      {
        pagesArray.map((data, i) => {
          return i
        })
      }
    </div>
  )
}

export default Pagination