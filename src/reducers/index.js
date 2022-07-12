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
                filteredHeroes: state.activeFilter === 'all' ? action.payload : action.payload.filter(hero => hero.element === state.activeFilter),
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETE': 
            const newHeroes = state.heroes.filter(hero => hero.id !== action.payload)
            return {
                ...state,
                heroes: newHeroes,
                filteredHeroes: state.activeFilter === 'all' ? newHeroes : newHeroes.filter(hero => hero.element === state.activeFilter),
            }
        case 'HERO_CREATE': 
            const updateHeroes = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: updateHeroes,
                filteredHeroes: state.activeFilter === 'all' ? updateHeroes : updateHeroes.filter(hero => hero.element === state.activeFilter),
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