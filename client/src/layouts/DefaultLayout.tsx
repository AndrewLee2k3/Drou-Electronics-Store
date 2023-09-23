import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
