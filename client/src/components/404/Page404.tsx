import images from '@/assets';
import { NavLink } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center ">
      <img
        className="h-16 object-cover"
        src={images.logo.logoDrou}
        alt={images.logo.logoDrou}
      />

      <h5 className="text-text-main text-40 font-bold animate-bounce">
        Ooops! Error 404
      </h5>
      <p className="text-text-sub text-lg font-semibold text-center">
        Sorry, But the page you are looking for does't exist!
      </p>
      <NavLink
        to="/"
        className="py-3 px-5 bg-primary rounded-3xl font-bold uppercase text-white hover:bg-dark-60 duration-300"
      >
        Back To Home
      </NavLink>
    </div>
  );
};

export default Page404;
