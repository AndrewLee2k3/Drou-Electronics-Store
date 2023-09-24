import images from '@/assets';
import { FiMenu, FiSearch } from 'react-icons/fi';

import {
  AiOutlineHeart,
  AiOutlineShopping,
  AiOutlineUser
} from 'react-icons/ai';
import Item from './Item';
import ItemDown from './ItemDown';
import HeaderMobile from './HeaderMobile';
import { useState } from 'react';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="sticky bg-white top-0 z-[100] flex justify-between items-center text-text-sub w-full h-20 border-b-[1px] px-3 lgl:px-10  xl:px-28  shadow-md">
      <img
        className="w-[120px] mdl:w-[166px] object-cover"
        src={images.logoDrou}
        alt={images.logoDrou}
      />
      <div className="hidden lgl:flex text-15 gap-10 font-bold">
        <Item title="Home" path="/" />
        <div className="relative group">
          <Item title="Electronics" path="/electronics" iconDown={true} />
          <ItemDown />
        </div>
        <Item title="Blog" path="/blog" />
        <Item title="Pages" path="/pages" />
        <Item title="Contact" path="contact" />
      </div>

      <div className="flex gap-5 text-2xl">
        <Item path="search" icon={<FiSearch />} />
        <Item path="search" icon={<AiOutlineHeart />} />
        <Item path="search" icon={<AiOutlineShopping />} />
        <Item path="search" icon={<AiOutlineUser />} />
        <div className="flex lgl:hidden  justify-between items-center">
          <button
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            className="hover:text-red duration-300"
          >
            <FiMenu />
          </button>
        </div>
      </div>

      {showMenu && <HeaderMobile setShowMenu={setShowMenu} />}
    </div>
  );
};

export default Header;
