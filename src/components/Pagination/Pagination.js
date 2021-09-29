import React, { useEffect } from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

    useEffect(() => {
    }, [])

    const pageNumbers1 = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers1.push(i);
    }


    return (
        <div className="container">
            <nav>
                <ul className='pagination'>

                    {pageNumbers1.map(number => (
                        <li key={number} className='page-item'>
                            <button onClick={() => paginate(number)} className='page-link'>
                                {number}
                            </button>
                        </li>
                    ))}

                  
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;