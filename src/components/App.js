import React, { createContext, useState ,useRef} from 'react'
import '../styles/App.css';
import Navbar from './navbar/Navbar';
import Home from '../pages/home/Home';
import SignUp from '../pages/signup/signin/SignUp';
import EnterPassword from '../pages/signup/enterpassword/EnterPassword';
import { createBrowserRouter, Outlet, RouterProvider, } from "react-router-dom";
import Songs from './songs/Songs';
import LandingPage from '../pages/landingpage/LandingPage';
import { Provider } from 'react-redux';
// import store,{persistor} from "../redux/store/store"
// import { PersistGate } from 'redux-persist/integration/react'
import ComingSoon from '../pages/comingsoon/ComingSoon';
import SearchResult from '../pages/searchresultspage/SearchResult';
import Library from '../pages/library/Library';
const ArtistsContext = createContext();
const App = () => {
  const [followingArtists, setFollowingArtists] = useState([]);
  console.log("followingArtists=", followingArtists);
  // const followingArtistsRef = useRef([]);
  // console.log("followingArtistsREF=", followingArtistsRef);
  const Layout = () => {
    return (
      // <Provider store={store}>
      //   <PersistGate loading={null} persistor={persistor}>
      <ArtistsContext.Provider value={{ followingArtists, setFollowingArtists }}>
      {/* // <ArtistsContext.Provider value={{followingArtistsRef }}> */}
        <div id="main">
          <Outlet />
        </div>
      </ArtistsContext.Provider>
      //   </PersistGate>
      // </Provider>
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
          path: "/songs",
          element: (<>
            <Navbar />
            <Songs />
          </>
          )
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
          path: "/searchresult/:searchvalue",
          element: (<>
            <Navbar />
            <SearchResult />
          </>
          )
        },
        {
          path: "/library/*",
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
export { ArtistsContext };
