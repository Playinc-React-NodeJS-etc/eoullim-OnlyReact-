import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './WritePage.css';

const WritePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 게시글 작성 로직 구현
    navigate('/board');  // 작성 완료 후 게시판으로 이동
  };

  return (
    <div className="write-container">
      <header className="main-header">
        <div className="header-left">
          <Link to="/main" className="main-title" style={{ textDecoration: 'none', color: 'black' }}>어울림</Link>
          <h1 className="page-title">글쓰기</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="write-form">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="content-input"
        />
        <div className="button-group">
          <button type="button" onClick={() => navigate(-1)} className="cancel-button">
            취소
          </button>
          <button type="submit" className="submit-button">
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default WritePage;