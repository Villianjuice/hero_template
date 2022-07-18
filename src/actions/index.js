export const fetchHeroes = (request) => (dispatch) => {
    request('http://localhost:3001/heroes')
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));
}

export const fetchFilters = (request) => (dispatch) => {
    request('http://localhost:3001/filters')
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));
}

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroCreate = (hero) => {
    return {
        type: 'HERO_CREATE',
        payload: hero
    }
}

export const heroDelete = (id) => {
    return {
        type: 'HERO_DELETE',
        payload: id
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const changeFilter = (filter) => {
    return {
        type: 'CHANGE_FILTER', 
        payload: filter
    }
}

// export const changeFilter = (filter) => (dispatch) => {
//     setTimeout(() => {
//         dispatch({
//             type: 'CHANGE_FILTER', 
//             payload: filter
//         })
//     }, 1000)
// } 