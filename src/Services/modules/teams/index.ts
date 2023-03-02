import { AllTeamsResponse, TeamElement } from '@/models/team_interface'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchTeams = createAsyncThunk('teams/fetch', async () => {
  const response = await axios.get<AllTeamsResponse>(
    'http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams',
  )
  const sortedData = response.data.sports[0].leagues[0].teams.sort(
    (a: TeamElement, b: TeamElement) => a.team.name.localeCompare(b.team.name),
  )
  return sortedData
})
