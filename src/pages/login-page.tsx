import { Link, Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus, LoadingStatus } from '../const';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { login } from '../store/api-actions';
import { CITIES_MOCK } from '../mocks/cities';
import { setCurrentCity, setRandomCity } from '../store/action';

function LoginPage(): JSX.Element {
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const loadingStatus = useAppSelector((state) => state.loadingStatus);
  const submitHandler = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({email, password}));
  }, [dispatch, email, password]);

  useEffect(() => {
    dispatch(setRandomCity(CITIES_MOCK[Math.floor(Math.random() * CITIES_MOCK.length)]));
  }, [dispatch]);
  const randomCity = useAppSelector((state) => state.randomCity);

  return authStatus !== AuthStatus.Auth ? (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Main} className="header__logo-link">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            {loadingStatus === LoadingStatus.Error && <div><span>Something went wrong,<br/>check the requirements and try again later.</span></div>}
            <form className="login__form form" onSubmit={submitHandler}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={onEmailChange}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={onPasswordChange}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main} onClick={() => dispatch(setCurrentCity(randomCity))}>
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  ) : <Navigate to={AppRoute.Main}/>;
}

export default LoginPage;
