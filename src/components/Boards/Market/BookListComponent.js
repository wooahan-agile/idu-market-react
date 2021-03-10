import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowUp } from "react-icons/ai";
import SearchComponent from "../SearchComponent";
import { MARKET_GET_REQUEST } from "../../../redux/types";

import { BoardItemData } from "../../../container/BoardItemData";
import { useDispatch } from "react-redux";

const BookListComponent = ({ categoryName }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: MARKET_GET_REQUEST,
      payload: categoryName,
    });
  }, [dispatch]);

  return (
    <section className="market" id="market">
      <a href="#board-banner" className="scroll-top-btn">
        <AiOutlineArrowUp />
      </a>
      <SearchComponent categoryName={categoryName} />
      <div className="container">
        {BoardItemData.map((board) => {
          return (
            <div className="market-items" key={board.num}>
              <Link
                to={`/boards/book/${board.num}`}
                className="market-img-box-link"
              >
                <div className="market-img-box">
                  <img src={board.image} alt="test" />
                </div>
              </Link>
              <Link to={`/boards/book/${board.num}`}>
                <h1 className="market-item-title">{board.title}</h1>
              </Link>
              <p className="market-item-price">{board.price}</p>
              <p className="market-item-id">{board.id}</p>
              <p className="market-item-date">{board.date}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BookListComponent;
