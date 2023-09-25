import { NavLink } from 'react-router-dom';

interface ItemSubBanner {
  title: string;
  sub: string;
  image: string;
}

const ItemSubBanner = ({ title, sub, image }: ItemSubBanner) => {
  return (
    <div className="w-1/2 relative  pt-8 h-[390px] bg-cover text-center shrink-0 self-center overflow-hidden rounded-md group">
      <img
        className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
        src={image}
        alt={image}
      />
      <div className="absolute w-full  flex flex-col gap-3  items-center">
        <h6 className="text-text-sub text-15 font-normal">{title}</h6>
        <h4 className="text-text-main text-2xl font-medium">{sub}</h4>
        <NavLink
          to="shop"
          className="bg-primary px-5 py-3  text-white font-bold  text-sm rounded-3xl hover:bg-dark-60 duration-300"
        >
          Shop Now
        </NavLink>
      </div>
    </div>
  );
};

export default ItemSubBanner;
