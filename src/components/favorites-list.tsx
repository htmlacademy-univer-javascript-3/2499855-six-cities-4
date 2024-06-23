import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import { useAppDispatch } from '../store/hooks';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { setCurrentCity } from '../store/action';
import FavoriteCard from './card/favorite-card';

type OfferListProps = {
  city: City;
  offers: Offer[];
};

function FavoritesList({city, offers}: OfferListProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.Main} onClick={() => dispatch(setCurrentCity(city))}>
            <span>{city.name}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <FavoriteCard key={offer.id} offer={offer} dispatch={dispatch} />
        ))}
      </div>
    </li>
  );
}
export default FavoritesList;
