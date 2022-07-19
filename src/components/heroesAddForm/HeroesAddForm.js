import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { fetchFilters } from '../../actions';
import { useHttp } from '../../hooks/http.hook';
import {heroCreate} from '../../slices/heroesSlice'

const HeroesAddForm = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [element, setElement] = useState('');
  const { filters, filtersLoadingStatus } = useSelector(({filters}) => filters);

  const createHero = (e) => {
    e.preventDefault();
    const hero = {
      id: uuidv4(),
      name,
      description,
      element,
    };

    dispatch(heroCreate(hero));
    request('http://localhost:3001/heroes', 'POST', JSON.stringify(hero));

    setName('');
    setDescription('');
    setElement('');

    // console.log(hero);
  };

  useEffect(() => {
    dispatch(fetchFilters(request));
    
  }, []);

  const renderFilter = (filters, filtersLoadingStatus) => {
    if (filtersLoadingStatus === 'loading') {
      return <option value="loading">Загрузка...</option>;
    }
    if (filtersLoadingStatus === 'error') {
      return <option value="error">Ошибка загрузки...</option>;
    }
    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        if (name === 'all') return;

        return (
          <option key={name} value={name}>
            {label}
          </option>
        );
      });
    }
  };
  // console.log(filters);

  return (
    <form onSubmit={createHero} className="border p-4 shadow-lg rounded">
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Как меня зовут?"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Что я умею?"
          style={{ height: '130px' }}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          required
          className="form-select"
          id="element"
          name="element"
          value={element}
          onChange={(e) => setElement(e.target.value)}>
          <option>Я владею элементом...</option>
          {renderFilter(filters, filtersLoadingStatus)}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
