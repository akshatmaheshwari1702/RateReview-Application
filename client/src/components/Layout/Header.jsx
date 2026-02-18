import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SearchBar from '../Common/SearchBar';
import '../../styles/components/Header.css';

const Header = ({ searchQuery, onSearchChange }) => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <FaStar className="logo-icon" />
          <span className="logo-text">
            Review&<span className="logo-bold">RATE</span>
          </span>
        </Link>

        <div className="header-center">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search..."
          />
        </div>

        <nav className="header-nav">
          <Link to="/" className="nav-link">
            SignUp
          </Link>
          <Link to="/" className="nav-link">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
