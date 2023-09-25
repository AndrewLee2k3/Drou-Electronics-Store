import logoDrou from './images/logo/logo_300x300.png';
import watchBn from './images/banner/watch.jpg';
import phoneBn from './images/banner/phone.jpg';
import subBn1 from './images/banner/sub-banner-1.jpg';
import subBn2 from './images/banner/sub-banner-2.jpg';

import iPhone from './images/categories/p7_300x300.avif';
import accessories from './images/categories/p4_300x300.avif';
import speakers from './images/categories/11_300x300.avif';
import headphones from './images/categories/12_300x300.avif';
import laptop from './images/categories/10_300x300.avif';
import tablets from './images/categories/9_300x300.avif';
import appStore from './images/app/appstore.jpg';
import chPlay from './images/app/chplay.jpg';

import delivery from './images/logo/delivery.png';
import pay from './images/logo/pay.png';
import personalize from './images/logo/personalize.png';

const images = {
  logo: {
    logoDrou,
    personalize,
    delivery,
    pay
  },
  banner: {
    subBn1,
    subBn2,
    watchBn,
    phoneBn
  },
  app: {
    appStore,
    chPlay
  },
  categories: {
    iPhone,
    accessories,
    tablets,
    laptop,
    headphones,
    speakers
  }
};

export default images;
