import { Link } from 'react-router-dom';
interface ItemFooter {
  title: string;
  data: {
    name: string;
    path: string;
  }[];
}
const ItemFooter = ({ title, data }: ItemFooter) => {
  return (
    <div className="flex flex-col gap-5 text-15 font-semibold">
      <h5 className="font-bold text-text-main text-xl">{title}</h5>
      {data.map(({ name, path }) => (
        <Link className='hover:text-primary duration-300' key={name} to={path}>
          {name}
        </Link>
      ))}
    </div>
  );
};

export default ItemFooter;
