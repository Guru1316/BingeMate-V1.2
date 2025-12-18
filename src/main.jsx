import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createHashRouter, RouterProvider, Navigate} from 'react-router-dom';
import Home from './pages/HomePage.jsx';
import Diary from './pages/DiaryPage.jsx';
import Reviews from './pages/ReviewsPage.jsx';
import Season from './pages/SeasonDetailsPage.jsx';
import Series from './pages/SeriesDetailsPage.jsx';
import Watchlist from './pages/WatchlistPage.jsx';
import Episode from './pages/EpisodeDetailsPage.jsx';
import Login from './pages/LoginPage.jsx';
import Register from './pages/RegisterPage.jsx';
import SeriesForm from './pages/SeriesForm.jsx';
import ProtectedRoutes from './pages/ProtectedRoutes.jsx';
import AboutPage from './pages/AboutPage.jsx';
import PublicReviews from './pages/PublicReviewsPage.jsx';

// eslint-disable-next-line react-refresh/only-export-components
const LoginRoute = () => {
  const auth = localStorage.getItem("auth") === "true";
  return auth ? <Navigate to="/home" replace /> : <Login />;
};

const routerVariables = createHashRouter([{
  path:"/",
  element:<App/>,
  children:[
    {
      path:"/",
      element: <Home></Home>,
    },
    {
      path:"/about",
      element: <AboutPage></AboutPage>
    },
    {
      path:"/publicreviews",
      element: <PublicReviews></PublicReviews>
    },
    {
      path:"/episode",
      element: <Episode></Episode>
    },
    {
      path:"/diary",
      element: <ProtectedRoutes> <Diary></Diary> </ProtectedRoutes> ,
    },
    {
      path:"/addSeries",
      element: <ProtectedRoutes> <SeriesForm></SeriesForm> </ProtectedRoutes> ,
    },
    {
      path:"/login",
      element: <LoginRoute></LoginRoute>,
    },
    {
      path:"/register",
      element: <Register></Register>,
    },
    {
      path:"/reviews/:seriesId",
      element: <Reviews></Reviews>,
    },
    {
      path:"/season",
      element: <Season></Season>,
    },
    {
      path:"/series/:seriesId",
      element: <Series></Series>,
    },
    {
      path:"/watchlist",
      element: <ProtectedRoutes> <Watchlist></Watchlist> </ProtectedRoutes>,
    },
    {
      path:"*",
      element:<h1>Page Not Found Please Check Your URL</h1>
    }
  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routerVariables}/>
  </StrictMode>,
)
