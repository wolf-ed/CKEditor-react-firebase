import React, { useState, useEffect } from "react";
import { getDocs, deleteDoc, doc } from 'firebase/firestore';
import { postsCollectionRef } from "../App";
import { AiOutlineDelete } from 'react-icons/ai'
import { auth, db } from "../firebase-configuration";
import parse from 'html-react-parser';


const Home = ({ isAuth }) => {
    const [postLists, setPostList] = useState([]);

    const getPosts = async () => {
        const data = await getDocs(postsCollectionRef)
        setPostList(data.docs.map((doc) =>
            ({ ...doc.data(), id: doc.id })
        ))
    }

    useEffect(() => {
        getPosts()
    }, [])

    const deletePost = async (postId) => {
        const postDoc = doc(db, "posts", postId)
        await deleteDoc(postDoc)
        getPosts()
    }


    return <div className="homePage">
        {postLists.map((post) => {
            return <div
                className="post"
                key={post.id}
            >
                <div className="postHeader">
                    <div className="title">
                        <h1>{post.title}</h1>
                    </div>
                    <div className="deletePost">
                        {isAuth && post.author.id === auth.currentUser.uid && <button onClick={() => { deletePost(post.id) }}><AiOutlineDelete /></button>}
                    </div>
                </div>
                <div className="postTextContainer">{parse(post.postText)}</div>
                <div className="post-footer">
                    <h3>@{post.author.name}</h3>
                    <h4>{post.formatedDate}</h4>
                </div>
            </div>
        })}
    </div>
}

export default Home;