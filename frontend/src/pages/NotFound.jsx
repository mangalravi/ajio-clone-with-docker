import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="max-w-xl mx-auto px-4 py-24 text-center">
    <h1 className="text-6xl font-extrabold text-ajio-dark mb-4">404</h1>
    <p className="text-gray-500 mb-8">
      The page you are looking for does not exist.
    </p>
    <Link to="/" className="btn-primary">
      Back to Home
    </Link>
  </div>
);

export default NotFound;
