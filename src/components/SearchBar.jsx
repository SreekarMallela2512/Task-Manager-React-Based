import { useTask } from '../context/TaskContext';
import { HiOutlineMagnifyingGlass, HiOutlineXMark } from 'react-icons/hi2';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useTask();

  return (
    <div className="relative" id="search-bar">
      <HiOutlineMagnifyingGlass
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none"
      />
      <input
        id="search-input"
        type="text"
        placeholder="Search tasks by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-surface-light/80 border border-surface-lighter rounded-xl
                   pl-12 pr-10 py-3 text-text-primary placeholder:text-text-muted
                   transition-all duration-200"
      />
      {searchQuery && (
        <button
          id="clear-search"
          onClick={() => setSearchQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg
                     text-text-muted hover:text-text-primary hover:bg-surface-lighter
                     transition-colors cursor-pointer"
        >
          <HiOutlineXMark className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
