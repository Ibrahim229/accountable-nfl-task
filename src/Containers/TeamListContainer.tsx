import React, { useCallback } from 'react'
import { View } from 'react-native'
import { useTheme } from '@/Hooks'
import { TextInput } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { RootState, setSearchQ, useAppDispatch } from '@/Store'
import TeamsList from '@/Components/teamList'

const TeamListContainer = () => {
  const { Gutters, Common, Layout } = useTheme()
  const dispatch = useAppDispatch()
  const searchQuery = useSelector((state: RootState) => state.teams.searchQuery)

  const handleSearchQueryChange = useCallback(
    (text: string) => {
      dispatch(setSearchQ(text))
    },
    [dispatch],
  )

  return (
    <View style={[Layout.fill, Gutters.largeHPadding]}>
      <TextInput
        onChangeText={handleSearchQueryChange}
        value={searchQuery}
        placeholder="Search"
        style={[Common.textInput]}
      />
      <TeamsList />
    </View>
  )
}

export default TeamListContainer
