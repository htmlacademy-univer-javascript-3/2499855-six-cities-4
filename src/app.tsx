import MainScreen from './pages/main-screen/main-screen';
import LoginScreen from './pages/login-screen/login-screen';
import FavoutitesScreen from './pages/favorites-screen/favorites-screen';
import OfferScreen from './pages/offer-screen/offer-screen';
import ErrorScreen from './pages/error-screen/error-screen';
import PrivateRoute from './components/private-routes/private-routes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

type AppComponentProps = {
  placesCount: number;
}

function App({placesCount}: AppComponentProps): JSX.Element {
  return <MainScreen placesCount = {placesCount} />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<MainScreen placesCount={placesCount} />} />
        <Route path="/login" element = {<LoginScreen />} />
        <Route
          path="/favourites"
          element = {
            <PrivateRoute>
              <FavoutitesScreen/>
            </PrivateRoute>
          }
        />
        <Route path="/offer/:id" element = {<OfferScreen />} />
        <Route path="*" element = {<ErrorScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
