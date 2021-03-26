import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import BoardListItem from "../../components/Boards/BoardListItem";
import { useSelector } from "react-redux";

const WatchlistComponent = (props) => {
  const studentId = props.match.params.studentId;
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.id.length !== 0) {
      if (studentId !== auth.id) {
        alert("잘못된 접근입니다.");
        props.history.push(`/`);
      } else {
        axios
          .get(`/api/watchlist/${studentId}`)
          .then((response) => {
            if (response.data.success) {
              const result = response.data.boards;
              setLoading(true);
              setProductList(result);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [studentId, auth.id, props.history]);

  return (
    <section className="market" id="market">
      {loading ? (
        <>
          <Link to={`/students/${studentId}`} className="profile-move-btn">
            Profile
          </Link>
          <h1 className="watchlist-title">
            {`관심 목록 (${productList.length})`}
          </h1>
          <div className="container">
            <BoardListItem
              productList={productList}
              studentId={studentId}
              profile
            />
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

export default withRouter(WatchlistComponent);
