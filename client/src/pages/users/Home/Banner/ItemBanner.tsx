import { BiRightArrowAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';

interface ItemBanner {
  label: string;
  banner: string;
  title: string;
  sub: string;
}

const ItemBanner = ({ label, title, sub, banner }: ItemBanner) => {
  console.log(banner);

  return (
    <div
      className={`w-full h-full bg-cover`}
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="w-[45%] pl-32  h-full flex flex-col justify-center gap-4">
        <h5 className="text-2xl text-primary font-medium">{label}</h5>
        <h4 className="text-56 text-text-main font-bold">{title}</h4>
        <p className="text-lg leading-loose text-text-sub font-medium">{sub}</p>
        <Link to="shop">
          <button className="flex  items-center justify-center mt-4 font-bold uppercase text-15 py-4 rounded-3xl text-white bg-primary w-1/3 hover:bg-dark-60 duration-300">
            Shop Now
            <span className="text-xl">
              <BiRightArrowAlt />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ItemBanner;
