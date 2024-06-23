import { useAppDispatch } from '../store/hooks';
import { Offer } from '../types/offer';
import Card from './card/card';

type OfferListProps = {
  offers: Offer[];
};

function OfferList({offers}: OfferListProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <Card key={offer.id} offer={offer} dispatch={dispatch} />
      ))}
    </div>
  );
}
export default OfferList;
