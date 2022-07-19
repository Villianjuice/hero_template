import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filters: [],
  activeFilter: 'all',
  filtersLoadingStatus: 'idle',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filtersFetching(state) {state.filtersLoadingStatus = 'loading'},
    filtersFetched(state, action) {
      state.filtersFetched = 'idle';
      state.filters = action.payload
    },
    filtersFetchingError(state) {state.filtersLoadingStatus = 'error'},
    changeFilter(state, action) {
      state.activeFilter = action.payload
    }
  }
})

export const {filtersFetching, filtersFetched, filtersFetchingError, changeFilter} =filterSlice.actions 
export default filterSlice.reducer;
