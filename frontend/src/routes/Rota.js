import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

function Rota({ isPrivate = false, component: Component, ...rest }) {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/home',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default Rota;
