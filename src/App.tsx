import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import { MainLayout } from './Layouts/MainLayout';
import { HomePage } from './Pages/HomePage';
import { MoviesPage } from './Pages/MoviesPage';
import { TVShowsPage } from './Pages/TVShowsPage';
import { MoviePage } from './Pages/MoviePage';
import { TVShowPage } from './Pages/TVShowPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path='/movies' element={<MoviesPage />} />
      <Route path='/movies/:id' element={<MoviePage />} />
      <Route path='/shows' element={<TVShowsPage />} />
      <Route path='/shows/:id' element={<TVShowPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
