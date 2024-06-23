import MainScreen from './pages/main-screen/main-screen';
import LoginScreen from './pages/login-screen/login-screen';
import FavoritesScreen from './pages/favorites-screen/favorites-screen';
import OfferScreen from './pages/offer-screen/offer-screen';
import ErrorScreen from './pages/error-screen/error-screen';
import PrivateRoute from './components/private-routes/private-routes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Offer } from './types';

type AppComponentProps = {
  offers: Offer[];
}

function App({ offers }: AppComponentProps): JSX.Element {
  const favorites = offers.filter((i) => i.isFavorite);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<MainScreen offers = { offers }/>} />
        <Route path="/login" element = {<LoginScreen />} />
        <Route
          path="/favorites"
          element = {
            <PrivateRoute>
              <FavoritesScreen favorites = { favorites }/>
            </PrivateRoute>
          }
        />
        <Route path="/offer/:id" element = {<OfferScreen offers = { offers }/>} />
        <Route path="*" element = {<ErrorScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
