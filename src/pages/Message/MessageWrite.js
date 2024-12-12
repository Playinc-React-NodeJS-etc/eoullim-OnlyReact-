// src/pages/Message/MessageWrite.js
import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './MessageWrite.css';

const MessageWrite = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'messages'), { title, content });
        setTitle(''); // Reset title
        setContent(''); // Reset content
    };

    return (
        <div className="main-container">
            <h2>쪽지 보내기</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <div className="file-upload">
                    <label htmlFor="file-input" className="upload-icon">📷</label>
                    <input type="file" id="file-input" style={{ display: 'none' }} />
                    <button type="submit" className="send-button">전송</button>
                </div>
            </form>
        </div>
    );
};

export default MessageWrite;