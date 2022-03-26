import React, { useState, useEffect } from "react";
import { addDoc } from 'firebase/firestore';
import { auth } from "../../firebase-configuration";
import { useNavigate } from "react-router-dom";
import { postsCollectionRef } from "../../App";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './CreatePost.css';

const CreatePost = ({ isAuth }) => {
    const [title, setTitle] = useState('');
    // const [postText, setPostText] = useState('');
    let navigate = useNavigate()
    const [text, setText] = useState('');


    const formatDate = () => {
        const date = new Date()
        const formatLessThan10 = (number) => {
            return number < 10 ? `0${number}` : number
        }
        return `${formatLessThan10(date.getDate())}/${formatLessThan10(date.getMonth() + 1)}/${date.getUTCFullYear()}`
    }

    const createPost = async () => {

        await addDoc(postsCollectionRef, {
            title: title,
            // postText: postText,
            postText: text,
            author:
            {
                name: auth.currentUser.displayName,
                id: auth.currentUser.uid
            },
            formatedDate: formatDate()
        })
        navigate("/")
    }

    useEffect(() => {
        if (!isAuth) {
            navigate("/login")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div className="createPostPage">
        <div className="cpContainer">
            <h1>Create a Post</h1>
            <div className="inputGp">
                <label>Title</label>
                <input placeholder="Title..."
                    onChange={(event) => { setTitle(event.target.value) }}
                />
            </div>
            <div className="inputGp">
                <label>Post: </label>
                {/* <textarea placeholder="Post..."
                    onChange={(event) => { setPostText(event.target.value) }}
                /> */}
                <CKEditor
                    editor={ClassicEditor}
                    data={text}
                    onChange={(event, editor) => {
                        const data = editor.getData()
                        setText(data)
                    }}

                />
            </div>
            <button className="submitBtn"
                onClick={createPost}
            >Submit Post</button>
        </div>
    </div>
}

export default CreatePost;