import React, {useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REPLY_UPLOAD_REQUEST, COMMENT_GET_REQUEST } from '../../../redux/types';

const SingleComment = ({ comment, categoryName, num }) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.loading.userId);
    const [formValue, setFormValue] = useState({
        content: "",
        studentId: userId,
        categoryName,
        num,
        groupNum: comment.groupNum,
    });

    const resetValue = useRef(null);
    const [openReply, setOpenReply] = useState(false);

    const onChange = e => {
        setFormValue({
            ...formValue,
            [e.target.name] : e.target.value,
        })
    }

    const onOpenReply = () => {
        setOpenReply(!openReply);
    }

    const onSubmit = e => {
        e.preventDefault();

        const {content, studentId, categoryName, num, groupNum} = formValue;
        const body =  {
            content,
            studentId,
            categoryName,
            num,
            groupNum,
        }

        if (body.content.length === 0) {
            alert("댓글이 비었습니다.");
        } else {

            dispatch({
                type: REPLY_UPLOAD_REQUEST,
                payload: body,
            });

            setTimeout(() => {
                dispatch({
                    type: COMMENT_GET_REQUEST,
                    payload: body,
                });
            }, 200)
            

            resetValue.current.value = '';

            setFormValue({
                content: "",
                studentId: userId,
                categoryName,
                num,
                groupNum: "",
            });
        }
    }

    return (
        <>
            {comment && comment.depth === 0 ? (                
                <>
                    <div className="comment-box">
                        <div className="comment-student-id">
                            <span>{comment.studentId}</span>
                        </div> 
                        <div className="comment-content">
                            <span>{comment.content}</span>
                        </div> 
                        <div className="comment-comment-date">
                            <span>{comment.inDate}</span>
                        </div> 
                        <button onClick={onOpenReply} className="reply-open-btn">reply</button>

                        {openReply ? (
                            <div className="comment-submit-box">
                                <textarea 
                                    ref={resetValue}
                                    type="textarea"
                                    name="content"
                                    id="comment-contents"
                                    className="comment-contents"
                                    onChange={onChange}
                                    placeholder="Comment"
                                />

                                <button className="comment-submit-btn" onClick={onSubmit}>
                                    Submit
                                </button>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </>          
                ) : (
                    <>
                        <div className="reply-box">
                            <div className="comment-student-id">
                                <span>{comment.studentId}</span>
                            </div> 
                            <div className="comment-content">
                                <span>{comment.content}</span>
                            </div> 
                            <div className="comment-comment-date">
                                <span>{comment.inDate}</span>
                            </div> 
                        </div>
                    </>
                )
            }
        </>
    );
};

export default SingleComment;