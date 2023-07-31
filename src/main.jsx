import React from 'react';
import axios from 'axios'
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App.jsx';
import './css/index.css';
import ErrorPage from './pages/ErrorPage.jsx';
import IndexPage from './pages/IndexPage.jsx';
import AllMoviesPage from './pages/AllMoviesPage.jsx';
import MovieDetailPage from './pages/MovieDetailPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import YourRatingsPage from './pages/YourRatingsPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<IndexPage />} />

      {/* All Movies */}
      <Route
        path="movies"
        element={<AllMoviesPage />}
        loader={async () => {
          const res = await axios.get('/api/movies');
          return { movies: res.data };
        }}
      />
      <Route
        path="movies/:movieId"
        element={<MovieDetailPage />}
        loader={async ({ params }) => {
          const res = await axios.get(`/api/movies/${params.movieId}`);
          return { movie: res.data };
        }}
      />

      {/* Login */}
      <Route path="login" element={<LoginPage />} />

      {/* Your ratings */}
      <Route
        path="me"
        element={<YourRatingsPage />}
        loader={async () => {
          const res = await axios.get('/api/ratings');
          return { ratings: res.data };
        }}
      />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
