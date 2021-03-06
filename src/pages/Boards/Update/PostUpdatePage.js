import React from 'react';
import PostUpdateComponent from '../../../components/Boards/Update/PostUpdateComponent';
import BoardBanner from "../../../components/Boards/Layout/BoardBanner";
import { Helmet } from 'react-helmet';

const PostUpdatePage = () => {
    return (
        <>
            <Helmet>
                <title>IUAM-(Update)</title>
                <meta charSet="utf-8" />
                <meta name="description" content="Idu Used Article Market" />
                <meta name="keywords" content="Idu Used Article Market, IUAM, 인덕대학교, 아이두마켓, Idu, 중고시장, 중고마켓, 인덕대학교중고마켓, idu-market.shop, 글쓰기, Write, PostWrite" />
            </Helmet>
            <BoardBanner title="IUAM" desc="Update" />
            <PostUpdateComponent></PostUpdateComponent>
        </>
    );
};

export default PostUpdatePage;