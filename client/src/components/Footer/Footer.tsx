import images from '@/assets';
import ItemFooter from './ItemFooter';
const infomations = [
  {
    name: 'Product Support',
    path: '#'
  },
  {
    name: 'Checkout',
    path: '#'
  },

  {
    name: 'License Policy',
    path: '#'
  },
  {
    name: 'Affiliate',
    path: '#'
  }
];

const customers = [
  {
    name: 'Help Center',
    path: '#'
  },
  {
    name: 'Redeem Voucher',
    path: '#'
  },

  {
    name: 'Contact Us',
    path: '#'
  },
  {
    name: 'Policies & Rules',
    path: '#'
  }
];

const contacts = [
  {
    name: 'Drou Demo Store',
    path: '#'
  },
  {
    name: 'Ho Chi Minh City, 9 District, VietNam',
    path: '#'
  },

  {
    name: '(+84) 096 888 0945',
    path: '#'
  },
  {
    name: 'andrewleedev03@gmail.com',
    path: '#'
  }
];
const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto  flex justify-between gap-10 py-20  text-text-sub">
      <ItemFooter title="Contact Us" data={contacts} />
      <ItemFooter title="Infomation" data={infomations} />
      <ItemFooter title="Customer Service" data={customers} />

      <div className="flex w-[30%] flex-col gap-5 text-15 font-semibold">
        <h5 className="font-bold text-text-main text-xl">Download Our App</h5>
        <p>
          Download our App and get extra 15% Discount on your first Order..!
        </p>

        <div className="flex gap-5">
          <img
            className="shadow-lg"
            src={images.app.appStore}
            alt={images.app.appStore}
          />
          <img
            className="shadow-lg"
            src={images.app.chPlay}
            alt={images.app.chPlay}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
