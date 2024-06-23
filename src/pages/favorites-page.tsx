import { Offer } from '../types/offer';
import Header from '../components/header';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect } from 'react';
import { fetchFavorite } from '../store/api-actions';
import FavoritesList from '../components/favorites-list';
import { CITIES_MOCK } from '../mocks/cities';
import { Link } from 'react-router-dom';
import { AppRoute } from '../const';


function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavorite);
  }, [dispatch]);
  const offers: Offer[] = useAppSelector((state) => state.offersList).filter((offer) => offer.isFavorite);

  return (
    <div className="page">
      <Header />
      {offers.length > 0 ?
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {CITIES_MOCK.map((city) => (
                  offers.filter((offer) => offer.city.name === city.name).length > 0 && <FavoritesList city={city} offers={offers.filter((offer) => offer.city.name === city.name)} key={city.name} />
                ))}
              </ul>
            </section>
          </div>
        </main>
        :
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          </div>
        </main>}
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
