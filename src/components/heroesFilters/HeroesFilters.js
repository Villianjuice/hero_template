import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../spinner/Spinner';
import { changeFilter } from '../../slices/filterSlice';
import classNames from 'classnames';

const HeroesFilters = () => {
  const { filters, filtersLoadingStatus, activeFilter } = useSelector(state => state.filters);
  const dispatch = useDispatch();

  if (filtersLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (filtersLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderFilters = () => {
    if (filters && filters.length === 0)
      return <h5 className="text-center mt-5">Фильтры не найдены</h5>;

    return filters.map(({ name, className, label }) => {
      const btnClass = classNames('btn', className, {
        active: name === activeFilter,
      });
      return (
        <button className={btnClass} onClick={() => dispatch(changeFilter(name))}>
          {label}
        </button>
      );
    });
  };
  const elements = renderFilters();

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{elements}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
