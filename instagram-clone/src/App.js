import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';

// ----- modal
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
// ------ end of modal

function App() {

  
  const [posts1, setPosts] = useState ([]);
  //modal and input validation functions
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  //auth changes/updates
  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser){
        //user has signed in
        console.log(authuser);
        setUser(authuser);

        if (authuser.displayName){
          // don't update username
        } else {
          //if we just created someone...
          return authuser.updateProfile({
            displayName: userName,
          });
          
        }
      }else{
        //user has signed out
        setUser(null);
      }
    })
  }, [user, userName]);

  //listening to any database changes
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
    // []);
  });

  //sign up function
  const signUp = (event) => {
    event.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));
  }

  return (
    <div className="App">
      <Modal
        open={open}
        // let's use an inline function
        onClose={() => setOpen(false)}
      >
       <div style={modalStyle} className={classes.paper}>
       <form className="app__signup">
       <center>
       <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        
          />
        </center>
       <Input
          placeholder='username'
          type='text'
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          />
        <Input
        placeholder='email'
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <Input
        placeholder='password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <Button type='submit' onClick={signUp}>Sign Up</Button>
        </form>
      </div>
      </Modal>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzj5t4HhOLCuLG_PUtq4V4m8_Ywjbs9J7pzvDjk1u_MoBkcwt-0uzL6Ykb0UeifcZsdg&usqp=CAU"
          alt="sorry"
        />
        </div>

        <Button onClick={() => setOpen(true)}>Sign Up</Button>

        <h2>hello from the other side</h2> 
        {
          posts1.map(postss => (
            <Post userName={postss.userName} caption={postss.caption}
            imageURL={postss.imageURL} 
            />
          ))
        }
         
    </div>
  );
}

export default App;
