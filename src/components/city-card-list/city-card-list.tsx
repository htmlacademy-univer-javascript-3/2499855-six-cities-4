import CityCard from '../city-card/city-card';
import { Offer } from '../../types';

type CityCardListProps = {
  cities: Offer[];
};

function CityCardList({ cities }: CityCardListProps) {
  //const [activeOfferId, setActiveOfferId] = useState<number | undefined>(undefined);
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        cities.map(
          (city) => (
            <CityCard key={city.id} offer={city} />
          )
        )
      }
    </div>
  );
}

export default CityCardList;
