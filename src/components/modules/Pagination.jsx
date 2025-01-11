import React from "react";
import styles from "./Pagination.module.css";

function Pagination({ page, setPage, totalCoins }) {
  const coinsPerPage = 20; // Number of coins per page
  const totalPages = Math.ceil(totalCoins / coinsPerPage); // Calculating total number of pages

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1); // Decrease page if current page is greater than 1
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1); // Increase page if current page is less than total pages
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber); // Set the page to the selected page number
  };

  return (
    <div className={styles.pagination}>
      <button onClick={handlePrevPage} disabled={page === 1}>
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={page === index + 1 ? styles.active : ""}
        >
          {index + 1}
        </button>
      ))}
      <button onClick={handleNextPage} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
