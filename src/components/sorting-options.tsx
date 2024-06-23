import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCurrentSort } from '../store/action';
import { SortOption } from '../const';

function SortingOptions() {
  const [isOpen, setIsOpen] = useState(false);
  const selectedSortType: SortOption = useAppSelector((state) => state.currentSort);

  const dispatch = useAppDispatch();
  const handleSortTypeChange = (sortType: SortOption) => {
    dispatch(setCurrentSort(sortType));
  };
  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}>
        {selectedSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isOpen ? 'places__options--opened' : ''
        }`}
      >
        {Object.entries(SortOption).map(([key, sortType]) => (
          <li
            key={key}
            className={`places__option ${
              selectedSortType === sortType ? 'places__option--active' : ''
            }`}
            onClick={() => handleSortTypeChange(sortType)}
            tabIndex={0}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingOptions;
