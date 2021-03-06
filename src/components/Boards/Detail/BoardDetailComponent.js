import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import BoardDetailTop from "./BoardDetailTop";
import CommentComponent from "../Comment/CommentComponent";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import { editorConfiguration } from "../../Editor/EditorConfig";
import {
  BOARD_DETAIL_REQUEST,
  BOARD_HIT_REQUEST,
  COMMENT_GET_REQUEST,
} from "../../../redux/types";

const BoardDetailComponent = (props) => {
  const categoryName = props.match.params.categoryName;
  const num = props.match.params.num;

  const boardDetail = useSelector((state) => state.boards);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.id.length === 0) {
      dispatch({
        type: BOARD_DETAIL_REQUEST,
        payload: {
          categoryName,
          num,
          studentId: "not-login",
        },
      });
      dispatch({
        type: COMMENT_GET_REQUEST,
        payload: {
          categoryName,
          num,
          studentId: "not-login",
        },
      });
    } else {
      dispatch({
        type: BOARD_HIT_REQUEST,
        payload: {
          categoryName,
          num,
        },
      });
      dispatch({
        type: BOARD_DETAIL_REQUEST,
        payload: {
          categoryName,
          num,
          studentId: auth.id,
        },
      });

      dispatch({
        type: COMMENT_GET_REQUEST,
        payload: {
          categoryName,
          num,
          studentId: auth.id,
        },
      });
    }
  }, [dispatch, categoryName, num, props.history, auth.id]);

  return (
    <section id="board-Detail" className="board-Detail">
      <div className="container">
        <BoardDetailTop
          boardDetail={boardDetail}
          categoryName={categoryName}
          num={num}
        />

        <div className="detail-edtior">
          <CKEditor
            editor={BalloonEditor}
            data={boardDetail.content}
            config={editorConfiguration}
            disabled="true"
          />
        </div>
        <CommentComponent categoryName={categoryName} num={num} />
      </div>
    </section>
  );
};

export default withRouter(BoardDetailComponent);
