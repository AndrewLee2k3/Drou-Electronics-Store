import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

interface Rating {
  rating: number;
  numReviews?: number;
}
const Rating = ({ rating, numReviews }: Rating) => {
  const getStar = (value: number) => {
    if (rating >= value) {
      return <BsStarFill key={value} />;
    }
    if (rating >= value - 0.5) {
      return <BsStarHalf key={value} />;
    }
    return <BsStar key={value} />;
  };
  return (
    <div className="flex text-star items-center">
      <div className="text-yellow-500">
        {[1, 2, 3, 4, 5].map((value) => getStar(value))}
      </div>
      {numReviews !== undefined && numReviews !== 0 ? (
        <span className="ml-2 text-text mt-1 dark:text-white ">
          {numReviews + ' reviews'}
        </span>
      ) : (
        ''
      )}
    </div>
  );
};

export default Rating;
