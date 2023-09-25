import { BsCalendarMinus } from 'react-icons/bs';
import { Link } from 'react-router-dom';

interface ItemBlog {
  time: string;
  title: string;
  image: string;
  path: string;
}
const ItemBlog = ({ time, title, image, path }: ItemBlog) => {
  return (
    <div className="flex flex-col gap-4 group">
      <div className="flex relative h-[268px] w-[413px] shrink-0 self-center overflow-hidden">
        <img
          className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
          src={image}
          alt={image}
        />
      </div>
      <div className="flex gap-2 text-text-sub items-center">
        <span>
          <BsCalendarMinus />
        </span>
        <p className=" font-medium text-sm">{time}</p>
      </div>
      <Link
        to={path}
        className="text-text-main font-semibold text-xl hover:text-primary duration-300"
      >
        {title}
      </Link>
    </div>
  );
};

export default ItemBlog;
