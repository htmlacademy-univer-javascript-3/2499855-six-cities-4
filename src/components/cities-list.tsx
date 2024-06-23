import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCurrentCity } from '../store/action';
import { City } from '../types/city';

type CitiesListProps = {
  cities: City[];
};

type CityProps = {
  city: City;
  changeCityName: (city: City) => void;
  currentCity: City;
};

const CityTab = ({ city, changeCityName, currentCity }: CityProps): JSX.Element => (
  <li className="locations__item" onClick={() => changeCityName(city)}>
    <a className="tabs__item locations__item-link" style={city === currentCity ? {textShadow: '1px 0 0, .5px 0 0, -1px 0 0'} : {}} href="#">
      <span>{city.name}</span>
    </a>
  </li>
);

function CitiesList({ cities }: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const handleCityChange = (city: City) => {
    dispatch(setCurrentCity(city));
  };
  const currentCity = useAppSelector((state) => state.city);
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <CityTab
          key={city.name}
          city={city}
          changeCityName={handleCityChange}
          currentCity={currentCity}
        />
      ))}
    </ul>
  );
}

export default CitiesList;
