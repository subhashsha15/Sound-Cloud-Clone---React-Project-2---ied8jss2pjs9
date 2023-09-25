import React, { createContext, useState, useRef } from 'react'
import '../styles/App.css';
import Navbar from './navbar/Navbar';
import Home from '../pages/home/Home';
import SignUp from '../pages/signup/signin/SignUp';
import EnterPassword from '../pages/signup/enterpassword/EnterPassword';
import { createBrowserRouter, Outlet, RouterProvider, } from "react-router-dom";
import Songs from './songs/Songs';
import LandingPage from '../pages/landingpage/LandingPage';
import ComingSoon from '../pages/comingsoon/ComingSoon';
import SearchResult from '../pages/searchresultspage/SearchResult';
import Library from '../pages/library/Library';
import AudioPlayer from './audioPlayer/AudioPlayer';
const App = () => {
  // const audioRef = useRef(null);
  // // const [isPlaying, setIsPlaying] = useState(false);
  const Layout = () => {
    return (
      <div id="main">
        <Outlet />
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <LandingPage />
        },
        {
          path: "/home",
          element: <>
            <Navbar />
            <Home />
          </>
        },
        {
          path: "/signup",
          element: <SignUp />
        },
        {
          path: "/songs/:id",
          element: <Songs />
        },
        {
          path: "/enterpassword",
          element: <EnterPassword />
        },
        {
          path: "/comingsoon",
          element: <ComingSoon />
        },
        {
          path: "/searchresult",
          element: (<>
            <Navbar />
            <SearchResult  />
          </>
          )
        },
        {
          path: "/library",
          element: (<>
            <Navbar />
            <Library />
          </>
          )
        },
      ]
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
