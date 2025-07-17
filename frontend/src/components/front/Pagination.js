import React, { useState } from "react";

const Pagination = ({ totalItems = 400, itemsPerPage = 10, setCurrPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setCurrPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxPagesToShow - 1);

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-8 h-8 rounded-full text-sm font-medium ${
            i === currentPage
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="text-center space-x-2 mt-6">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 text-gray-700 disabled:opacity-50 hover:bg-gray-200 rounded"
      >
        &lt;
      </button>

      {/* Page Numbers */}
      {renderPageNumbers()}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 text-gray-700 disabled:opacity-50 hover:bg-gray-200 rounded"
      >
        &gt;
      </button>

      {/* Item Range Info */}
      <div className="mt-3 text-sm text-gray-600">
        {startItem}-{endItem} of {totalItems} items
      </div>
    </div>
  );
};

export default Pagination;
