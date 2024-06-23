import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute, AuthStatus, LoadingStatus } from '../const.tsx';
import { Offer } from '../types/offer.ts';
import { AxiosInstance } from 'axios';
import { Review } from '../types/review.ts';
import { Dispatch } from '../types/state.ts';
import { addReview, loadOffer, loadOffers, setAuthStatus, setLoadingStatus, setUser } from './action.ts';
import { User } from '../types/user.ts';
import { deleteToken, setToken } from '../services/token.ts';


type ThunkApiConfig = {
  dispatch: Dispatch;
  extra: AxiosInstance;
};

type UserLogin = {
  email: string;
  password: string;
};

type FavoriteData = {
  id: string;
  status: number;
};

export const fetchOffers = createAsyncThunk<Offer[], undefined, ThunkApiConfig>(
  'fetchOffers',
  async (_arg, {extra: api, dispatch}) => {
    dispatch(setLoadingStatus(LoadingStatus.Pending));
    const {data} = await api.get<Offer[]>(ApiRoute.Offers);
    dispatch(setLoadingStatus(LoadingStatus.Success));
    dispatch(loadOffers(data));
    return data;
  }
);

export const fetchOffer = createAsyncThunk<Offer, Offer['id'], ThunkApiConfig>(
  'fetchOffer',
  async (offerId, {extra: api, dispatch}) => {
    dispatch(setLoadingStatus(LoadingStatus.Pending));
    const {data: offer} = await api.get<Offer>(`${ApiRoute.Offers}/${offerId}`);
    const {data: reviews} = await api.get<Review[]>(`${ApiRoute.Reviews}/${offerId}`);
    const {data: nearby} = await api.get<Offer[]>(`${ApiRoute.Offers}/${offerId}/nearby`);
    offer.reviews = reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    offer.nearby = nearby;
    dispatch(setLoadingStatus(LoadingStatus.Success));
    dispatch(loadOffer(offer));
    return offer;
  }
);

export const checkAuth = createAsyncThunk<void, undefined, ThunkApiConfig>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data: user} = await api.get<User>(ApiRoute.Login);
      dispatch(setAuthStatus(AuthStatus.Auth));
      dispatch(setUser(user));
    } catch {
      dispatch(setAuthStatus(AuthStatus.NoAuth));
    }
  }
);

export const login = createAsyncThunk<void, UserLogin, ThunkApiConfig>(
  'user/login',
  async (userLogin: UserLogin, {dispatch, extra: api}) => {
    dispatch(setLoadingStatus(LoadingStatus.Pending));
    try {
      const {data} = await api.post<User>(ApiRoute.Login, userLogin);
      setToken(data.token);
      dispatch(setAuthStatus(AuthStatus.Auth));
      dispatch(setUser(data));
      dispatch(setLoadingStatus(LoadingStatus.Success));
    } catch {
      dispatch(setLoadingStatus(LoadingStatus.Error));
    }
  },
);

export const logout = createAsyncThunk<void, undefined, ThunkApiConfig>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    deleteToken();
    dispatch(setAuthStatus(AuthStatus.NoAuth));
    dispatch(setUser(undefined));
    dispatch(fetchOffers());
  }
);

export const postReview = createAsyncThunk<void, Review, ThunkApiConfig>(
  'postReview',
  async (reviewData, { dispatch, extra: api }) => {
    dispatch(setLoadingStatus(LoadingStatus.Pending));
    try {
      const { data: review } = await api.post<Review>(
        `${ApiRoute.Reviews}/${reviewData.id}`,
        {
          comment: reviewData.comment,
          rating: reviewData.rating,
        }
      );
      dispatch(setLoadingStatus(LoadingStatus.Success));
      dispatch(addReview(review));
    } catch (e) {
      dispatch(setLoadingStatus(LoadingStatus.Error));
    }
  }
);

export const setFavorite = createAsyncThunk<void, FavoriteData, ThunkApiConfig>(
  'setFavorite',
  async (favoriteData, { dispatch, extra: api }) => {
    dispatch(setLoadingStatus(LoadingStatus.Pending));
    try {
      await api.post<Offer>(`${ApiRoute.Favourites}/${favoriteData.id}/${favoriteData.status}`);
      await dispatch(fetchOffers());
      dispatch(setLoadingStatus(LoadingStatus.Success));
    } catch (e) {
      dispatch(setLoadingStatus(LoadingStatus.Error));
    }
  }
);

export const fetchFavorite = createAsyncThunk<void, undefined, ThunkApiConfig>(
  'fetchFavorite',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setLoadingStatus(LoadingStatus.Pending));
    try {
      const { data: offers } = await api.get<Offer[]>(`${ApiRoute.Favourites}`);
      dispatch(loadOffers(offers));
      dispatch(setLoadingStatus(LoadingStatus.Success));
    } catch (e) {
      dispatch(setLoadingStatus(LoadingStatus.Error));
    }
  }
);
