import React from 'react'
import "./pagination.css"
import { Link } from 'react-router-dom';

const Pagination = ({ currentPage, totalPages, clickEventFun, url }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    return (
        <div className='mt-2 rounded-none bg-gray-200'>
            <div className='join pagination-custome rounded-none'>
                {pageNumbers.map((pageNumber, index) => (
                    <Link
                        className={(pageNumber === currentPage) ? 'join-item btn btn-square text-white  bg-blue-700' : 'join-item btn btn-square text-white bg-gray-300'}
                        key={pageNumber}
                        to={`${url}?page_number=${index}`}
                        onClick={(e) => clickEventFun(index)}
                    >
                        <label style={{ textDecoration: 'none' }}>
                            {pageNumber === currentPage ? <strong>{pageNumber}</strong> : pageNumber}
                        </label>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Pagination;
