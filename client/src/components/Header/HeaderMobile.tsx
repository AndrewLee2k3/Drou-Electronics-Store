import { Dispatch, SetStateAction } from 'react';
import Item from './Item';
import { FiSearch } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

import { AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { BiPhone } from 'react-icons/bi';

import Social from '../Social/Social';

interface HeaderMobile {
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}
const HeaderMobile = ({ setShowMenu }: HeaderMobile) => {
  console.log(setShowMenu);

  return (
    <div className="w-[80%] flex flex-col text-15 gap-5  min-h-screen overflow-scroll bg-white absolute top-0 left-0 p-4 scrollbar-hide shadow-menu duration-300 text-text-main">
      <div>
        <button
          onClick={() => setShowMenu(false)}
          className="absolute top-2 right-2 text-text-main text-2xl hover:text-red duration-300"
        >
          <MdClose />
        </button>
      </div>
      <p className="text-red">Tell a friend about Drou & get 20% off*</p>
      <div className="flex justify-between items-center border-2 h-12 ">
        <input
          className="px-3 border-none outline-none w-full h-full"
          type="text"
          placeholder="Search"
        />
        <div className="text-xl px-2">
          <FiSearch />
        </div>
      </div>
      <div className="flex flex-col gap-3 font-bold">
        <Item title="Home" path="/" />
        <Item title="Electronics" path="/electronics" iconDown={true} />
        <Item title="Blog" path="/blog" />
        <Item title="Pages" path="/pages" />
        <Item title="Contact" path="contact" />
      </div>
      <div className="h-[1px] w-full bg-dark-20"></div>

      <div className="flex flex-col gap-3">
        <p className="text-red font-bold text-lg">Location Store</p>
        <div className="flex items-center font-semibold gap-8">
          <NavLink to="/auth/login" className="hover:text-red duration-300">
            <div className="flex text-xl gap-1">
              <Item path="/auth/login" icon={<AiOutlineUser />} />
              <span className="text-15 font-semibold">Login</span>
            </div>
          </NavLink>

          <NavLink to="/auth/register" className="hover:text-red duration-300">
            <div className="flex text-xl gap-1">
              <Item path="/auth/register" icon={<AiOutlineUserAdd />} />
              <span className="text-15 font-semibold">Register</span>
            </div>
          </NavLink>
        </div>
        <div className="flex items-center text-xl gap-3">
          <BiPhone />
          <p className="text-15 font-semibold">096 888 0945</p>
        </div>
      </div>

      <div className="h-[1px] w-full bg-dark-20"></div>

      <Social />
    </div>
  );
};

export default HeaderMobile;
