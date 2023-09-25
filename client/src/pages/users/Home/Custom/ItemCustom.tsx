interface ItemCustom {
  title: string;
  sub: string;
  image: string;
}
const ItemCustom = ({ title, sub, image }: ItemCustom) => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center px-10">
      <img src={image} alt={image} />
      <h5 className="text-text-main font-extrabold text-xl">{title}</h5>
      <p className="text-text-sub font-medium text-lg text-center">{sub}</p>
    </div>
  );
};

export default ItemCustom;
