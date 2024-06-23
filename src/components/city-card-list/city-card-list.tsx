import { useState } from 'react';
import CityCard from '../city-card/city-card';
import { Offer } from '../../types';

type CityCardListProps = {
  cities: Offer[];
};

function CityCardList({ cities }: CityCardListProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeOfferId, setActiveOfferId] = useState<number | undefined>(undefined);
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        cities.map(
          (city) => (
            <CityCard key={city.id} offer={city} onMouseEnter={setActiveOfferId} />
          )
        )
      }
    </div>
  );
}

export default CityCardList;
