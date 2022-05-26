export interface IStarshipTotal {
  starShipClass: string;
  total: number;
}

const StarShipItem = ({ starShipClass, total }: IStarshipTotal) => {
  return (
    <div>
      {starShipClass}:{total}
    </div>
  );
};

export default StarShipItem;
