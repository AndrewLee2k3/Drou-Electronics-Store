import images from '@/assets';
import ItemCustom from './ItemCustom';

function Custom() {
  return (
    <div className="mt-16  bg-light-50">
      <div className="max-w-7xl mx-auto h-[263px] flex justify-between items-center">
        <ItemCustom
          title="Free delivery"
          sub="And free returns. See checkout for delivery dates."
          image={images.logo.delivery}
        />

        <ItemCustom
          title="Pay monthly at 0% APR"
          sub="Choose to check out with Apple Card Monthly Installments."
          image={images.logo.pay}
        />

        <ItemCustom
          title="Personalize it"
          sub="Engrave your device with your name or a personal note"
          image={images.logo.personalize}
        />
      </div>
    </div>
  );
}

export default Custom;
