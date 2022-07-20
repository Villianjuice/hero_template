import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { useHttp } from '../hooks/http.hook';

const heroesAdapter = createEntityAdapter()

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: 'idle'
})

export const fetchHeroes = createAsyncThunk(
  'heroes/fetchHeroes',
  async () => {
    const {request} = useHttp();
    return await request('http://localhost:3001/heroes')
  }
)

const heroSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    heroCreate(state, action) {
      heroesAdapter.addOne(state, action.payload)
    },
    heroDelete(state, action) {
      heroesAdapter.removeOne(state, action.payload)
    }
  }, 
  extraReducers: (builder) => {
    builder.addCase(fetchHeroes.pending, (state) => {state.heroesLoadingStatus = 'loading'})
    builder.addCase(fetchHeroes.fulfilled, (state, action) => {
      heroesAdapter.setAll(state, action.payload)
      state.heroesLoadingStatus = 'idle'
    })
    builder.addCase(fetchHeroes.rejected, (state) => {state.heroesLoadingStatus = 'error'})
    builder.addDefaultCase(() => {})
  }
})

const {reducer, actions} = heroSlice
const {selectAll} = heroesAdapter.getSelectors((state => state.heroes))

export default reducer;

export const filteredHeroesSelector = createSelector(
  (state) => state.filters.activeFilter,
  selectAll,
  (activeFilter, heroes) => {
    if (activeFilter === 'all') {
      return heroes;
    } else {
      return heroes.filter((hero) => hero.element === activeFilter);
    }
  },
);

export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroCreate,
  heroDelete
} = actions