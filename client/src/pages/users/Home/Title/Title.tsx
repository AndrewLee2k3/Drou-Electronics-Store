import { BiRightArrowAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
interface Title {
  title: string;
  nameRight?: string;
  path: string;
  rightElm?: boolean;
}

const Title = ({ title, rightElm, nameRight, path }: Title) => {
  return (
    <div className="w-full flex justify-between items-center">
      <h5 className="text-3xl font-bold text-text-main">{title}</h5>

      {rightElm && (
        <Link to={path}>
          <div className="flex items-center font-extrabold">
            <h5 className="text-15 text-text-main hover:text-primary duration-200">
              {nameRight}
            </h5>
            <span className="text-primary text-xl">
              <BiRightArrowAlt />
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Title;
