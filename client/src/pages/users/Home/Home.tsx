import Banner from './Banner/Banner';
import SubBanner from './Banner/SubBanner';
import Blog from './Blog/Blog';
import Categories from './Categories/Categories';
import Custom from './Custom/Custom';
import LatestProducts from './LatestProducts/LatestProducts';

const Home = () => {
  return (
    <>
      <Banner />
      <div className="flex flex-col gap-20 max-w-7xl mx-auto lgl:p-3 xl:p-0">
        <Categories />
        <SubBanner />
        <LatestProducts />
        <Blog />
      </div>

      <Custom />
    </>
  );
};

export default Home;
