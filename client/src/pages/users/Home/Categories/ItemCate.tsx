interface ItemCate {
  image: string;
  name: string;
}

const ItemCate = ({ image, name }: ItemCate) => {
  return (
    <div className="flex flex-col items-center border-[1px] pt-6 pb-8 group shadow-md">
      <div className="flex relative h-[144.4px] w-[144.4px] shrink-0 self-center overflow-hidden">
        <img
          className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-110"
          src={image}
          alt={image}
        />
      </div>
      <button className="text-text-sub text-lg font-medium hover:text-primary duration-200">
        {name}
      </button>
    </div>
  );
};

export default ItemCate;
