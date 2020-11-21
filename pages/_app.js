import '../styles/App.css';
import { useFetchUser } from '../lib/user';
import Login from '../components/Auth/Login';
import Logout from '../components/Auth/Logout';

export default function MyApp({ Component, pageProps }) {
  const { user, loading } = useFetchUser();

  if (loading) {
    return (
      <div>
        Loading...
        <br />
        <progress />
      </div>
    );
  }

  if (!loading && !user) {
    return <Login />;
  }

  return <Component {...pageProps} />;
}
