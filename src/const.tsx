export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  NotFound = '/404'
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum SortOption {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export enum MapMarker {
  Default = 'img/pin.svg',
  Current = 'img/pin-active.svg'
}

export enum ApiRoute {
  Offers = '/offers',
  Reviews = '/comments',
  Favourites = '/favorite',
  Login = '/login',
  Logout = '/logout'
}

export enum ApiConst {
  baseURL = 'https://14.design.htmlacademy.pro/six-cities',
  RequestTimeout = 5000,
  TokenKeyName = 'six-cities-token'
}

export enum LoadingStatus {
  Pending,
  Success,
  Error
}

export const REVIEW_MIN_LENGTH = 50;
export const REVIEW_MAX_LENGTH = 300;
