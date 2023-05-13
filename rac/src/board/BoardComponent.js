import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Pagination from '../utils/Pagination';
import moment from 'moment';

const BoardComponent = (props) => {
  const [posts, setPosts] = useState([]);
  const [ currPage, setCurrPage ] = useState(1);
  const [ postPerPage ] = useState(10);

  useEffect(() => {
    const fetchPosts = async() => {
      // let res = await 
      let res = {data:{}};
      setPosts(res.data);
    }
    fetchPosts();
  }, []);

  const indexOfLastPost = currPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const list = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrPage(pageNumber);
  
  return (
    <div className="container" style={{fontFamily: 'Noto Sans Korean, Malgun Gothic, sans-serif'}}>
      <div className="lf-menu-nav"><span>공지사항</span></div>
      <div className="lf-contents pd12">
        <div className="top-controls">
          <a href="/write">
            <button className="lf-button primary float-right">글쓰기</button>
          </a>
        </div>
        <div style={{padding: "0 12px"}}>
          <table className="board_list text-center">
            <colgroup>
              <col width="5%"/>
              <col width="*"/>
              <col width="50%"/>
              <col width="*"/>
              <col width="*"/>
              <col width="*"/>
              <col width="*"/>              
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>구분</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일시</th>
                <th>조회수</th>
                <th>첨부</th>
              </tr>
            </thead>
            <tbody>
              {list.map(post => (
                <tr key={post._id}>
                  <td>{post._id}</td>
                  <td>{post.type}</td>
                  <td className="text-left">
                    <Link className="text-ellipseis" to={{
                      pathname: './view', state: {_id: post._id}
                    }} style={{color: '#909090'}}>{post.title}</Link>
                  </td>
                  <td>{post.userName}</td>
                  <td>{post.date}</td>
                  <td>{post.readCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination perPage={postPerPage} total={list.length}
        currPage={currPage} paginate={paginate}></Pagination>
      </div>
    </div>
  )
};

export default BoardComponent;