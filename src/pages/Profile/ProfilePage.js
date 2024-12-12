import React from 'react';
import { Link } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  return (
    <div className="profile-container">
      <header className="main-header">
        <div className="header-left">
          <Link to="/main" className="main-title" style={{ textDecoration: 'none', color: 'black' }}>어울림</Link>
          <h1 className="page-title">프로필</h1>
        </div>
      </header>

      <div className="profile-content">
        <div className="profile-info">
          <div className="profile-image">👤</div>
          <h2>사용자 이름</h2>
          <p>사용자 소개글</p>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-label">게시글</span>
            <span className="stat-value">0</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">댓글</span>
            <span className="stat-value">0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;