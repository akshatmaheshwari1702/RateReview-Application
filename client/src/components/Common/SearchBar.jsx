import { FaSearch } from 'react-icons/fa';
import '../../styles/components/SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
      <FaSearch className="search-icon" />
    </div>
  );
};

export default SearchBar;
