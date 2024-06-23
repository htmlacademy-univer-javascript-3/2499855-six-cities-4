import { Offer } from '../../types/offer';
import { AppRoute, AuthStatus } from '../../const';
import { Link, useNavigate } from 'react-router-dom';
import { setCurrentPoint } from '../../store/action';
import { Dispatch } from '../../types/state';
import { useAppSelector } from '../../store/hooks';
import { useCallback } from 'react';
import { setFavorite } from '../../store/api-actions';

type CardProps = {
  offer: Offer;
  dispatch: Dispatch;
}
function Card({ offer, dispatch }: CardProps): JSX.Element {
  const fixedPoint = useAppSelector((state) => state.currentOffer?.location);
  const auth = useAppSelector((state) => state.authorizationStatus === AuthStatus.Auth);
  const navigate = useNavigate();
  const favorteHandler = useCallback(() => {
    if (!auth) {
      return navigate(AppRoute.Login);
    }
    dispatch(setFavorite({id: offer.id, status: offer.isFavorite ? 0 : 1}));
  }, [auth, dispatch, navigate, offer.id, offer.isFavorite]);

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => dispatch(setCurrentPoint(offer.location))}
      onMouseLeave={() => fixedPoint ? dispatch(setCurrentPoint(fixedPoint)) : dispatch(setCurrentPoint(undefined))}
    >
      <div className="cities__image-wrapper place-card__image-wrapper">
        {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick={favorteHandler}
            className={`place-card__bookmark-button button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
          >
            <span>
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">In bookmarks</span>
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{offer.type.toUpperCase()}</p>
      </div>
    </article>
  );
}

export default Card;
