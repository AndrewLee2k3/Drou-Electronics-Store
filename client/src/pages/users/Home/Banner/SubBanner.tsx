import images from '@/assets';
import ItemSubBanner from './ItemSubBanner';

const SubBanner = () => {
  return (
    <div className="flex justify-between items-center gap-7">
      <ItemSubBanner
        title="SECURITY SMART CAMERA"
        sub="Just Starting At $850"
        image={images.banner.subBn1}
      />
      <ItemSubBanner
        title="ENTERTAINMENT & GAMES"
        sub="Just Starting at $850 Hurry up!"
        image={images.banner.subBn2}
      />
    </div>
  );
};

export default SubBanner;
