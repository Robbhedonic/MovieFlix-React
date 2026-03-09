// import { MoviesPage } from '../Pages/MoviesPage';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/UI/Navbar';

export const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <section>
          <Outlet />
        </section>
      </main>
    </>
  );
};
