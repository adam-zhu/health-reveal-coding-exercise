import '../styles/App.css';
import { useFetchUser } from '../lib/user';

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
