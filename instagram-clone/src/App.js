import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

function App() {

  const [posts1, setPosts] = useState ([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  });

  return (
    <div className="App">
      
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzj5t4HhOLCuLG_PUtq4V4m8_Ywjbs9J7pzvDjk1u_MoBkcwt-0uzL6Ykb0UeifcZsdg&usqp=CAU"
          alt=""
        />
        
        </div>
        <h2>hello from the other side</h2>
        <div>
            {posts1.map((post) => {
              return <div>
                {post.userName} {post.caption}
                <img
                  src={post.imageURL}
                />
              </div>
            })
            }
          </div> 
        {
          posts1.map(postss => (
            <Post userName={postss.userName1} caption={postss.caption1}
            imageURL={postss.imageURL1} 
            />
          ))
        }
         
    </div>
  );
}

export default App;
