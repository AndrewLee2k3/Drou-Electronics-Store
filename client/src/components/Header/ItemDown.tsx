import { Link } from 'react-router-dom';

const ItemDown = () => {
  return (
    <div className="opacity-0 invisible absolute flex justify-between  -left-60 gap-32 w-[800px] p-6 bg-white top-24 group-hover:visible group-hover:opacity-100 group-hover:top-20 duration-300 shadow-arround rounded-md">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="flex flex-col gap-3 text-15 text-text-gray font-normal"
        >
          <h5 className="font-extrabold text-text-main">Smart Phone</h5>
          <Link to="">Direct TV</Link>
          <Link to="">LCD Screen</Link>
          <Link to="">Windows phones</Link>
          <Link to="">Wired Earbuds</Link>
          <Link to="">Nokia phone</Link>
        </div>
      ))}
    </div>
  );
};

export default ItemDown;
