const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filteredHeroes: [],
    activeFilter: 'all',
    filtersLoadingStatus: 'idle'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETE':
            return {
                ...state,
                heroes: state.heroes.filter(hero => hero.id !== action.payload),
            }
        case 'HERO_CREATE': 
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'CHANGE_FILTER': 
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' ? 
                                state.heroes :
                                state.heroes.filter(item => item.element === action.payload)
            }
        default: return state
    }
}

export default reducer;