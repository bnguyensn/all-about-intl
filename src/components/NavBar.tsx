import { Link } from 'react-router-dom';
import './NavBar.css';

export function NavBar() {
  return (
    <nav className="nav-bar">
      <Link to="/">Intl.NumberFormat</Link>
      <Link to="/datetime">Intl.DateTimeFormat</Link>
    </nav>
  );
}
