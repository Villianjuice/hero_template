import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { useHttp } from '../hooks/http.hook';

// const initialState = {
//   filters: [],
//   activeFilter: 'all',
//   filtersLoadingStatus: 'idle',
// };

const filterAdapter = createEntityAdapter()

const initialState = filterAdapter.getInitialState({
  activeFilter: 'all',
  filtersLoadingStatus: 'idle'
})

export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters',
  async () => {
    const {request} = useHttp();
    return await request('http://localhost:3001/filters')
  }
)

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeFilter(state, action) {
      state.activeFilter = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilters.pending, (state) => {state.filtersLoadingStatus = 'loading'})
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.filtersLoadingStatus = 'idle';
      filterAdapter.setAll(state, action.payload)
    })
    builder.addCase(fetchFilters.rejected, (state) => {state.filtersLoadingStatus = 'error'})
    builder.addDefaultCase(() => {})
  }
})

export const {selectAll} = filterAdapter.getSelectors(state => state.filters)
export const { changeFilter} = filterSlice.actions 
export default filterSlice.reducer;
