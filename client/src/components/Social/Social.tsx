import { AiFillLinkedin } from 'react-icons/ai';

import { SiZalo } from 'react-icons/si';

import { BiLogoFacebook, BiLogoGithub } from 'react-icons/bi';

const Social = () => {
  return (
    <div className="flex items-center gap-5 text-white font-bold text-xl">
      <a
        href="#"
        className="p-2 bg-dark-40 rounded-full hover:bg-red duration-300"
      >
        <BiLogoFacebook />
      </a>

      <a
        href="#"
        className="p-2 bg-dark-40 rounded-full hover:bg-red duration-300"
      >
        <AiFillLinkedin />
      </a>

      <a
        href="#"
        className="p-2 bg-dark-40 rounded-full hover:bg-red duration-300"
      >
        <BiLogoGithub />
      </a>

      <a
        href="#"
        className="p-2 bg-dark-40 rounded-full hover:bg-red duration-300"
      >
        <SiZalo />
      </a>
    </div>
  );
};

export default Social;
