import { useTask } from '../context/TaskContext';
import { HiOutlineFunnel, HiOutlineArrowsUpDown } from 'react-icons/hi2';

const FILTERS = ['All', 'High', 'Medium', 'Low'];

const FilterSort = () => {
  const { priorityFilter, setPriorityFilter, sortOrder, setSortOrder } = useTask();

  const activeColor = {
    All: 'bg-brand-500/20 text-brand-300 border-brand-500/40',
    High: 'bg-red-500/15 text-red-400 border-red-500/30',
    Medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    Low: 'bg-green-500/15 text-green-400 border-green-500/30',
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center" id="filter-sort">
      <div className="flex items-center gap-2 flex-1">
        <HiOutlineFunnel className="w-4 h-4 text-text-muted shrink-0" />
        <div className="flex gap-1.5 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              id={`filter-${f.toLowerCase()}`}
              onClick={() => setPriorityFilter(f)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 cursor-pointer
                ${priorityFilter === f
                  ? activeColor[f]
                  : 'bg-surface-lighter/40 text-text-muted border-transparent hover:bg-surface-lighter/70'
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <HiOutlineArrowsUpDown className="w-4 h-4 text-text-muted shrink-0" />
        <select
          id="sort-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="bg-surface-lighter/60 border border-surface-lighter rounded-lg px-3 py-1.5 text-xs font-medium text-text-secondary transition-all duration-200 cursor-pointer"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSort;
