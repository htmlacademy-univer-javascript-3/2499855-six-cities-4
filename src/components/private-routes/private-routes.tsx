import { Navigate } from 'react-router-dom';

type RouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: RouteProps): JSX.Element {
  const isLogged = false;
  return isLogged ? children : <Navigate to = {'/login'} />;
}

export default PrivateRoute;
