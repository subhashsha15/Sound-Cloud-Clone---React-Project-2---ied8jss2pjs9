import React from 'react'
import '../styles/App.css';
import Navbar from './navbar/Navbar';
import Home from '../pages/home/Home';
import SignUp from '../pages/signup/signin/SignUp';
import EnterPassword from '../pages/signup/enterpassword/EnterPassword';
import { createBrowserRouter, Outlet, RouterProvider, } from "react-router-dom";
import Songs from './songs/Songs';
import LandingPage from '../pages/landingpage/LandingPage';
import { Provider } from 'react-redux';
import store,{persistor} from "../redux/store/store"
import { PersistGate } from 'redux-persist/integration/react'
import ComingSoon from '../pages/comingsoon/ComingSoon';
const App = () => {
  const Layout = () => {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div id="main">
            <Outlet />
          </div>
        </PersistGate>
      </Provider>
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
          element: <ComingSoon/>
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
