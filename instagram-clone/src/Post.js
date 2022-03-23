import React from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";
function Post({userName, caption, imageURL}) {
  return (
    <div className="post">
        <div className="post__header">
        <Avatar 
        alt="" 
        className="post__avatar"
        src="/static/images/avatar/1.jpg" />
        <h3>{userName}</h3>
        </div>
        
        <img 
        alt=""
        className="post__image"
        src={imageURL}
        />
        <h4 className='post__text'><strong>userName</strong>: {caption}</h4>
    </div>
  )
}

export default Post