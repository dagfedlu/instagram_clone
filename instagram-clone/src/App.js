import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import { db, auth} from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import ImageUpload from './imageUpload';

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
  const [openSignIn, setOpenSignIn] = useState(false);

  //auth changes/updates
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has signed in
        console.log(authUser);
        setUser(authUser);
      }else {
        //user has signed out
        setUser(null);
      }
    })

    return () => {
      //cleanup actions
      unsubscribe();
    }

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
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then ((authUser) => {
        return authUser.user.updateProfile({
          displayName: userName
        })
      })
      .catch((error) => 
        alert(error.message));
        setOpen(false);
      
    // auth -- error for firebase 9
    // .createUserWithEmailAndPassword(email, password)
    // .catch((error) => alert(error.message));
  }

  //sign in
  const signIn = (event) => {
    event.preventDefault();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => alert(error.message));
  setOpenSignIn(false);
  }  

  return (
    <div className="App">
      {user?.email ? (
          <ImageUpload username={user.email} />
          ):
            (
              <h3>u need to log in sad emoji</h3>
            )
          }
      
      {/* for sign up */}
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

      {/* for sign in */}
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
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
        <Button type='submit' onClick={signIn}>Sign In</Button>
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

        {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>

      ): (
        <div className="app__loginContainer">
        <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
        <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )} 

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
