import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <div>
      <Header />
      <div className="min-h-screen max-w-7xl  mx-auto px-3 lgl:p-0">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
