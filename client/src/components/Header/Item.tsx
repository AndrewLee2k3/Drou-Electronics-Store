import { ReactElement } from 'react';
import { BiSolidChevronDown } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

interface Item {
  title?: string;
  iconDown?: boolean;
  path: string;
  icon?: ReactElement;
}

const Item = ({ title, iconDown, path, icon }: Item) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `${
          isActive ? 'text-red' : ''
        } flex lgl:h-20 items-center uppercase hover:text-red duration-300`
      }
      to={path}
    >
      {icon}
      {title}
      {iconDown && (
        <div>
          <BiSolidChevronDown />
        </div>
      )}
    </NavLink>
  );
};

export default Item;
