import OfferList from '../components/offers-list';
import { Offer } from '../types/offer';
import { LoadingStatus, SortOption } from '../const';
import Map from '../components/map';
import CitiesList from '../components/cities-list';
import { CITIES_MOCK } from '../mocks/cities';
import { useAppDispatch, useAppSelector } from '../store/hooks/index';
import SortingOptions from '../components/sorting-options';
import Spinner from '../components/spinner';
import Header from '../components/header';
import { loadOffer } from '../store/action';
import { useEffect } from 'react';
import { fetchOffers } from '../store/api-actions';

function getSortedOffers(offers: Offer[], sorting: SortOption): Offer[] {
  switch (sorting) {
    case SortOption.Popular:
      return offers;
    case SortOption.HighToLow:
      return offers.toSorted((a, b) => b.price - a.price);
    case SortOption.LowToHigh:
      return offers.toSorted((a, b) => a.price - b.price);
    case SortOption.TopRated:
      return offers.toSorted((a, b) => b.rating - a.rating);
  }
}

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadOffer(undefined));
    dispatch(fetchOffers());
  }, [dispatch]);
  const sort = useAppSelector((state) => state.currentSort);
  const offers: Offer[] = useAppSelector((state) => state.offersList);
  const currentCity = useAppSelector((state) => state.city);
  const loadingStatus = useAppSelector((state) => state.loadingStatus);
  const currentCityOffers = offers.filter((offer: Offer) => offer.city.name === currentCity.name);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={CITIES_MOCK} />
          </section>
        </div>
        {currentCityOffers.length !== 0 ?
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{currentCityOffers.length} places to stay in {currentCity.name}</b>
                <SortingOptions />
                <div className="cities__places-list places__list tabs__content">
                  {loadingStatus === LoadingStatus.Pending && <Spinner />}
                  <OfferList offers={getSortedOffers(currentCityOffers, sort)} />
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map points={currentCityOffers.map((offer) => offer.location)} city={currentCity}/>
                  {/* selectedPoint={useAppSelector((state) => state.currentPoint)} /> */}
                </section>
              </div>
            </div>
          </div>
          :
          <div className="cities">
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in {currentCity.name}</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
          </div>}
      </main>
    </div>
  );
}

export default MainPage;
