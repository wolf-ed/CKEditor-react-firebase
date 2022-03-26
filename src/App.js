import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './components/Home/Home';
import CreatePost from './components/CreatePost/CreatePost';
import Login from './components/Login/Login';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-configuration';
import { collection } from 'firebase/firestore';
import { db } from './firebase-configuration';
import { HiMenu } from 'react-icons/hi'

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
  const [navbarOptionsClass, setNavbarOptionsClass] = useState('navbar-options')

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
      toggleNavbarClass()
    })
  };

  if (navbarOptionsClass === 'navbar-options active') {
    setTimeout(() => {
      setNavbarOptionsClass('navbar-options')
    }, 10000)
  }

  const toggleNavbarClass = () => {
    if (navbarOptionsClass === 'navbar-options') {
      setNavbarOptionsClass('navbar-options active')
    } else {
      setNavbarOptionsClass('navbar-options')
    }
  }

  return (<Router>
    <nav className='navbar'>
      <a className='title' href="https://github.com/wolf-ed" target="_blank" rel="noopener noreferrer">GitHub</a>
      <button className="toggle-button"
        onClick={toggleNavbarClass}
      >
        <HiMenu />
      </button>
      <div className={navbarOptionsClass}>
        <Link to="/" onClick={toggleNavbarClass}>Home</Link>

        {!isAuth
          ? <Link to="/login" onClick={toggleNavbarClass}>Login</Link>
          : <><Link to="/createpost" onClick={toggleNavbarClass}>Create Post</Link> <div className='logoutBtn' onClick={signUserOut}>Logout</div></>}

      </div>
    </nav>
    <Routes>
      <Route path="/" element={<Home isAuth={isAuth} />} />
      <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
      <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
    </Routes>
  </Router>
  );
}

export const postsCollectionRef = collection(db, 'posts');
export default App;