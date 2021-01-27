import React from 'react';
import { useState, useEffect } from 'react';
//
import './App.css';
import { getPosts } from './api/post';
import { Post } from './interfaces/blog';

const dummy: Post[] = [
  {
    id: 1,
    authorId: 2,
    date: '2021-01-25T13:47:00',
    title: 'Technical Forex Outlook &#8211; 25.01.2021',
    content: 'asd asd as dasda das dad ',
  },
  {
    id: 2,
    authorId: 4,
    date: '2021-01-25T13:47:00',
    title: 'Technical Forex Outlook &#8211; 25.01.2021',
    content: 'sf sg dfg fdf sdf sadfasdfasdf asdf sdf s ',
  },
];
const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | void>([]);
  useEffect(() => {
    // const getAll = async (): Promise<Post[] | void> => {
    //   const res = await getPosts();
    //   return res;
    // };
    // getAll().then(data => {
    //   console.log(data);
    //   setPosts(data);
    // });
    setPosts(dummy);
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>Blog</header>
      <main>{!posts ? <h1>Fetching...</h1> : posts.map(post => <h1 key={post.id}>{post.id}</h1>)}</main>
    </div>
  );
};

export default App;
