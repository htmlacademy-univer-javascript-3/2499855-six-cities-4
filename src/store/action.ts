import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { SortOption, LoadingStatus, AuthStatus } from '../const';
import { Point } from '../types/point';
import { User } from '../types/user';
import { Review } from '../types/review';

export const setCurrentCity = createAction<City>('setCurrentCity');
export const loadOffers = createAction<Offer[]>('loadOffers');
export const loadOffer = createAction<Offer | undefined>('loadOffer');
export const setLoadingStatus = createAction<LoadingStatus>('setLoadingStatus');
export const setError = createAction<string>('setError');
export const setCurrentSort = createAction<SortOption>('setSortType');
export const setCurrentPoint = createAction<Point | undefined>('setSelectedPoint');
export const setAuthStatus = createAction<AuthStatus>('setAuthStatus');
export const setUser = createAction<User | undefined>('setUser');
export const addReview = createAction<Review>('addReview');
export const setRandomCity = createAction<City>('setRandomCity');
