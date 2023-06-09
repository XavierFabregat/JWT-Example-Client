import { ApolloLink, Observable, createHttpLink } from "@apollo/client";
import { getAccessToken, setAccessToken } from "../../accessToken";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";

export const requestLink = new ApolloLink(
  (operation, forward) => new Observable(observer => {
    let handle: any;
    Promise.resolve(operation)
      .then(operation => {
        const accessToken = getAccessToken();
        if (accessToken) {
          operation.setContext({
            headers: {
              authorization: `bearer ${accessToken}`
            }
          })
        }
      })
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        })
      })
      .catch(observer.error.bind(observer))

    return () => {
      if (handle) {
        handle.unsubscribe()
      }
    }
  })
);

export const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

export const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();

    if (!token) {
      return true;
    }

    try {
      const { exp } = jwtDecode<{ exp : number }>(token);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true
      };
    } catch {
      return false;
    }

  },
  fetchAccessToken: () => {
    return fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include',
    })
  },
  handleFetch: accessToken => {
    setAccessToken(accessToken);
  },
  handleError: err => {
    console.warn('Your refresh token is invalid. Try to relogin');
    console.error(err);
  }
})