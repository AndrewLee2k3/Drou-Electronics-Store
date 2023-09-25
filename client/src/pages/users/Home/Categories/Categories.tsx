import images from '@/assets';
import Title from '../Title/Title';
import ItemCate from './ItemCate';

const Categories = () => {
  return (
    <div className="flex flex-col">
      <Title title="Trending Categories" />
      <div className="grid grid-cols-6 gap-6 mt-14">
        <ItemCate image={images.categories.iPhone} name="iPhone" />
        <ItemCate image={images.categories.speakers} name="Mini speakers" />
        <ItemCate image={images.categories.tablets} name="Tablets" />
        <ItemCate image={images.categories.headphones} name="Headphones" />
        <ItemCate image={images.categories.laptop} name="Laptop" />
        <ItemCate image={images.categories.accessories} name="Accessories" />
      </div>
    </div>
  );
};

export default Categories;
