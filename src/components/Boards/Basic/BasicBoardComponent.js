import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import SearchComponent from "./SearchComponent";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import { FREEBOARD_GET_REQUEST } from "../../../redux/types";
import { useDispatch, useSelector } from "react-redux";

function BasicBoardComponent({ categoryName }) {
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const freeBoardList = useSelector((state) => state.boards.data);

  const perPage = 10;
  const pageVisited = pageNumber * perPage;
  const pageCount = Math.ceil(freeBoardList.length / perPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    if(!loading) {
      setLoading(true)
      dispatch({
        type: FREEBOARD_GET_REQUEST,
        payload: categoryName,
      });
    } else {
      setLoading(false)
    }
  }, [dispatch]);


  const displayBoardList = freeBoardList
    .slice(pageVisited, pageVisited + perPage)
    .map((boardItem) => {
      return (
        <tr key={boardItem.num}>
          <td>{boardItem.num}</td>
          <td className="boardlist-common-title">
            <Link to={`/boards/${categoryName}/${boardItem.num}`}>{boardItem.title}</Link>
          </td>
          <td>{boardItem.studentId}</td>
          <td>{boardItem.inDate.substring(0, 10)}</td>
          <td>{boardItem.hit}</td>
        </tr>
      );
    });

  return (
    <section id="boardlist-common" className="boardlist-common">
      <SearchComponent categoryName={categoryName} />
      {loading ? ( 
        <div className="container">
          <table className="boardlist-common-tables">
            <thead>
              <tr>
                <th>No</th>
                <th>제목</th>
                <th>작성자</th>
                <th>등록일</th>
                <th>조회수</th>
              </tr>
            </thead>
            
            <tbody id="boardlist-common-body">
            {displayBoardList}
          
            </tbody>
            
          </table>
          
          <div className="boardlist-common-write"></div>
        
          <div className="pagination-container">
            <ReactPaginate
              previousLabel={<FaAngleLeft />}
              nextLabel={<FaAngleRight />}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"pagination-container"}
              previousLinkClassName={"previousBtn"}
              nextLinkClassName={"nextBtn"}
              disabledClassName={"disabled"}
              activeLinkClassName={"active"}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="market-loading">
            <div className="spin"></div>
            <p className="market-loading-msg">Loading</p>
          </div>
        </>
      )}
    </section>
  );
}

export default BasicBoardComponent;