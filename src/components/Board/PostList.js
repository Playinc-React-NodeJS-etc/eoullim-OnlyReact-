import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const PostList = ({ onEdit }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(postsData);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'posts', id));
    fetchPosts(); // Refresh the list after deletion
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>게시글 목록</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => onEdit(post)}>수정</button>
            <button onClick={() => handleDelete(post.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;