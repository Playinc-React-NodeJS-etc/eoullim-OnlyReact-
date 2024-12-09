// src/App.js

import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import PostList from './components/Board/PostList';
import PostForm from './components/Board/PostForm';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function App() {
  const [currentPost, setCurrentPost] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(''); // 에러 상태 추가

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // 로딩 완료
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    setError(''); // 이전 오류 초기화
    try {
      await signOut(auth);
    } catch (err) {
      setError('로그아웃 중 오류가 발생했습니다.'); // 에러 메시지 설정
    }
  };

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 메시지 표시
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>게시판</h1>
          {user ? (
            <div>
              <button onClick={handleLogout}>로그아웃</button>
              <Link to="/profile">마이 프로필</Link>
            </div>
          ) : (
            <div>
              <Link to="/signup">회원가입</Link>
              <Link to="/login">로그인</Link>
            </div>
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* 에러 메시지 표시 */}
        </header>
        <main>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={
              <div>
                <h2>마이 프로필</h2>
                <p>이메일: {user?.email}</p>
                {/* 추가적인 사용자 정보 표시 가능 */}
              </div>
            } />
            <Route path="/" element={
              <>
                <PostForm currentPost={currentPost} setCurrentPost={setCurrentPost} />
                <PostList onEdit={setCurrentPost} />
              </>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;