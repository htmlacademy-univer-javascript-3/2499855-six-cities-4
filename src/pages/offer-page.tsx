import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ReviewForm from '../components/review-form';
import ReviewList from '../components/review-list';
import Map from '../components/map';
import OfferList from '../components/offers-list';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Header from '../components/header';
import { fetchOffer, setFavorite } from '../store/api-actions';
import { AppRoute, AuthStatus } from '../const';
import NotFoundPage from './not-found-page';

function OfferPage(): JSX.Element {
  const { id } = useParams();
  const { pathname } = useLocation();
  const currentOffer = useAppSelector((state) => state.currentOffer);
  const auth = useAppSelector((state) => state.authorizationStatus === AuthStatus.Auth);
  const offersList = useAppSelector((state) => state.offersList);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() =>{
    dispatch(fetchOffer(id ?? ''));
    window.scrollTo(0, 0);
  }, [pathname, dispatch, id, offersList]);
  const favorteHandler = useCallback(() => {
    if (!auth) {
      return navigate(AppRoute.Login);
    }
    dispatch(setFavorite({id: currentOffer!.id, status: currentOffer!.isFavorite ? 0 : 1}));
  }, [auth, currentOffer, dispatch, navigate]);

  return currentOffer ? (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images?.map((item) => (
                <div key={item} className="offer__image-wrapper">
                  <img className="offer__image" src={item} alt="Offer photo"/>
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button className={`offer__bookmark-button button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''}`} type="button" onClick={favorteHandler}>
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${currentOffer.rating * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type.toUpperCase()}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedroom{currentOffer.bedrooms! > 1 ? 's' : ''}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adult{currentOffer.maxAdults! > 1 ? 's' : ''}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods?.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={currentOffer.host?.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host?.name}
                  </span>
                  {currentOffer.host?.isPro && (
                    <span className="offer__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              {currentOffer.reviews && (
                <section className="offer__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{currentOffer.reviews.length}</span></h2>
                  <ReviewList reviews={currentOffer.reviews.slice(0, 10)} />
                </section>
              )}
              {auth && <ReviewForm />}
            </div>
          </div>
          <section className="offer__map map">
            <Map city={currentOffer.city} points={((currentOffer.nearby) ? currentOffer.nearby.slice(0, 3).map((offer) => offer.location) : []).concat(currentOffer.location)} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OfferList offers={currentOffer.nearby ? currentOffer.nearby.slice(0, 3) : []} />
            </div>
          </section>
        </div>
      </main>
    </div>
  ) : <NotFoundPage />;
}

export default OfferPage;
