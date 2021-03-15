import React, { useEffect, useState, useCallback } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import SearchComponent from "../Layout/SearchComponent";
import BoardListItem from "../BoardListItem";
import axios from "axios";

const ClothesComponent = ({categoryName}) => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const LAST_COUNT = 9;

  let isLoading = false;
  let lastNum = 0

  const getMoreData = useCallback(async () => {
    isLoading = true;

    await axios.get(`/api/boards/${categoryName}?lastNum=${lastNum}`).then((response) => {
      if (response.data.success) {
        const result = response.data.boards;

        if (result.length > 10) {
          window.removeEventListener("scroll", handleScroll);
        } else {
          lastNum = result[LAST_COUNT].num;
        }
        setLoading(true);
        setProductList(prev => [...prev, ...result]);
        isLoading = false;
      }
    });
  }, []);


  const handleScroll = useCallback(() => {
    const { documentElement } = document;
    const scrollHeight = documentElement.scrollHeight;
    const scrollTop = documentElement.scrollTop;
    const clientHeight = documentElement.clientHeight;

    console.log(isLoading);
    if (scrollTop + clientHeight + 100 >= scrollHeight && isLoading === false) {
       getMoreData();
    }
  }, []);

  useEffect(() => {
    getMoreData();
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  
  return (
    <section className="market" id="market">
        {loading ? (
          <>
            <a href="#board-banner" className="scroll-top-btn">
              <AiOutlineArrowUp />
            </a>
            <SearchComponent categoryName={categoryName} />
            <div className="container">
              <BoardListItem productList={productList}></BoardListItem>
            </div>
          </>
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
};

export default ClothesComponent;
