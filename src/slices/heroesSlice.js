import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle'
}

const heroSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    heroesFetching(state) {state.heroesLoadingStatus = 'loading'},
    heroesFetched(state, action) {
      state.heroes = action.payload;
      state.heroesLoadingStatus = 'idle'
    },
    heroesFetchingError(state) {state.heroesLoadingStatus = 'error'},
    heroCreate(state, action) {
      state.heroes.push(action.payload)
    },
    heroDelete(state, action) {
      state.heroes = state.heroes.filter(hero => hero.id !== action.payload)
    }
  }
})

const {reducer, actions} = heroSlice

export default reducer;
export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroCreate,
  heroDelete
} = actions