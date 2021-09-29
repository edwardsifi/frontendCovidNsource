import React, { useEffect, useState } from 'react';

const Pagination2 = ({ postsPerPage, totalPosts, paginate, currentPage, loadmore }) => {

    //limites de numeros de pagianas
    const [pageNumberLimit, setpageNumberLimit] = useState(4);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(4);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    //actualiza la pagina actual
    const handleClick = (number) => {
        paginate(Number(number));
        console.log(number);
    };

    //guarda la cantidad de items a mostrar por paginas
    const pages = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    //guarda los numeros de las paginas
    const renderPageNumbers = pages.map((number, index) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={() => handleClick(number)}
                    className={`page-item ${currentPage == number ? "active" : null}`}
                >
                    <button   className='page-link'>
                        {number}
                    </button>

                </li>
            );
        } else {
            return null;
        }
    });

    //manejo del next boton
    const handleNextbtn = () => {
        paginate(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    //manejo del prev boton
    const handlePrevbtn = () => {
        paginate(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit == 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    //guarda el li del next boton
    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
    }

    //guarda el li del prev boton
    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
    }

    const handleLoadMore = () => {
        loadmore();
    };


    return (
        <>
            {/* <div className="container">
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
            </div> */}

            {/* <h1>Todo List</h1> <br /> */}
            {/* {renderData(currentItems)} */}
            <div className="container pageNumbers">
                <nav>
                    <ul className='pagination'>
                        <li className='page-item'>
                            <button
                                className='page-link'
                                onClick={handlePrevbtn}
                                disabled={currentPage == pages[0] ? true : false}
                            >
                                Prev
                            </button>
                        </li>

                        {/* {pageDecrementBtn} */}
                        {renderPageNumbers}
                        {/* {pageIncrementBtn} */}

                        <li className='page-item'>
                            <button
                                className='page-link'
                                onClick={handleNextbtn}
                                disabled={currentPage == pages[pages.length - 1] ? true : false}
                            >
                                Next
                            </button>
                        </li>

                    </ul>
                    {/* <button onClick={handleLoadMore} className="loadmore">
                        Load More
                    </button> */}
                </nav>
            </div>

            {/* <ul className="pageNumbers">
                <li>
                    <button
                        onClick={handlePrevbtn}
                        disabled={currentPage == pages[0] ? true : false}
                    >
                        Prev
                    </button>
                </li>
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn}

                <li>
                    <button
                        onClick={handleNextbtn}
                        disabled={currentPage == pages[pages.length - 1] ? true : false}
                    >
                        Next
                    </button>
                </li>
            </ul>
            <button onClick={handleLoadMore} className="loadmore">
                Load More
            </button> */}
        </>
    );
};

export default Pagination2;