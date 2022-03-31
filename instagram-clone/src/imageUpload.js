import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { storage, db } from './firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
//import { snapshot } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore";
//import { FirebaseError } from 'firebase/app';
//import firebase from 'firebase/compat/app';

function ImageUpload({username}) {

    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState(0);
   
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    
    const handleUpload = () => {
        const imageRef = ref(storage, "image");
        uploadBytes(imageRef, image).then(() => {
            getDownloadURL(imageRef).then((url) => {
                setUrl(url);
                console.log(url);
                // please work
                const postImage = async () => {
                                     await addDoc(collection(db, "posts"), {
                                         //timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                         caption: caption,
                                         imageURL: url,
                                         userName: username  
                                       });
                                 }
                                 postImage();
            }).catch(error => {
                console.log(error.message, "error getting the image url")
            });
            
            setImage(null);
        });
        // const uploadTask = ref(storage, "posts");
        // uploadBytes(uploadTask, image)
        //     .then(() => {
        //         getDownloadURL(uploadTask)
        //             .then((url) => {
        //                 setUrl(url);
        //             })
        //            setImage(null); 
        //     })
        
        //     const a = () => {
        //         ref(storage, image.name)
        //         .getDownloadURL()
        //         .then(url => {
        //             const postImage = async () => {
        //                 await addDoc(collection(db, "posts"), {
        //                     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        //                     caption: caption,
        //                     imageURL: url,
        //                     userName: username  
        //                   });
        //             }
        //             setProgress(0);
        //             setCaption("");
        //             setImage(null);
        //             postImage();
        //         })
        //     }
        //     a();
    }; 

  return (
    <div>
        <progress value={progress} max="100" />
        <input type="text" placeholder='Enter a caption' onChange={event => setCaption(event.target.value)} value={caption}/>
        <input type="file" onChange = {handleChange}/>
        <Button onClick={handleUpload}>
            Upload 
        </Button>
    </div>
  )
}

export default ImageUpload