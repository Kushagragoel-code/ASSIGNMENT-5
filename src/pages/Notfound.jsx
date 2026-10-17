import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <h2>404</h2>
      <Link to="/" className="btn">Return Home</Link>
    </div>
  );
}

export default NotFound;