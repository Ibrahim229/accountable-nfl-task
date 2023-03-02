import { TeamElement } from '@/models/team_interface'
import { configureStore, createAction, createSlice } from '@reduxjs/toolkit'
import { fetchTeams } from '@/Services/modules/teams'
import { useDispatch } from 'react-redux'

interface TeamsState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  data: TeamElement[]
  error: string | null
  searchQuery: string
}

const initialState: TeamsState = {
  status: 'idle',
  data: [],
  error: null,
  searchQuery: '',
}

export const setSearchQ = createAction<string>('SET_SEARCH_QUERY')

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTeams.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown error'
      })
      .addCase(setSearchQ, (state, action) => {
        state.searchQuery = action.payload
      })
  },
})

const store = configureStore({
  reducer: {
    teams: teamsSlice.reducer,
  },
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
