import { TeamElement } from '@/models/team_interface'
import { RootState, useAppDispatch } from '@/Store'
import { useTheme } from '@/Hooks'
import { useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { fetchTeams } from '@/Services/modules/teams'
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  Text,
  View,
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native-gesture-handler'
import React from 'react'
import { navigate } from '@/Navigators/utils'

const TeamsList = () => {
  const { Layout, Gutters, Fonts, Common, Images } = useTheme()
  const dispatch = useAppDispatch()
  const teams = useSelector((state: RootState) => state.teams.data)
  const searchQuery = useSelector((state: RootState) => state.teams.searchQuery)
  const status = useSelector((state: RootState) => state.teams.status)
  const filteredTeams = teams.filter((team: TeamElement) =>
    team.team.name.toLowerCase().startsWith(searchQuery.toLowerCase()),
  )

  const [refreshing, setRefreshing] = useState(false)

  const refresh = useCallback(async () => {
    if (refreshing) {
      return
    }

    try {
      setRefreshing(true)
      await dispatch(fetchTeams())
    } finally {
      setRefreshing(false)
    }
  }, [dispatch, refreshing])

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run once

  const navigateToDetails = useCallback((item: TeamElement) => {
    navigate('teamDetails', item.team)
  }, [])

  const renderItem = useCallback(
    ({ item }: { item: TeamElement }) => {
      let team = item.team
      return (
        <TouchableOpacity
          onPress={() => navigateToDetails(item)}
          style={[
            Gutters.regularHPadding,
            Gutters.smallVPadding,
            Gutters.smallBMargin,
            Layout.row,
            Layout.justifyContentBetween,
            Common.listItem,
          ]}
        >
          <Text style={Fonts.textRegular}>{team.name}</Text>
          <Image
            style={Common.logo}
            source={{ uri: team.logos[0].href }}
            defaultSource={Images.logo}
          />
        </TouchableOpacity>
      )
    },
    [
      Common.listItem,
      Common.logo,
      Fonts.textRegular,
      Gutters.regularHPadding,
      Gutters.smallBMargin,
      Gutters.smallVPadding,
      Images.logo,
      Layout.justifyContentBetween,
      Layout.row,
      navigateToDetails,
    ],
  )

  return (status === 'idle' || status === 'loading') && !teams.length ? (
    <View style={[Layout.fill, Layout.colCenter]}>
      <ActivityIndicator />
    </View>
  ) : status !== 'failed' ? (
    filteredTeams.length > 0 ? (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredTeams}
        renderItem={renderItem}
        keyExtractor={item => item.team.id}
        contentContainerStyle={[Layout.column, Gutters.largeVPadding]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      />
    ) : (
      <View style={[Layout.fill, Layout.colCenter]}>
        <Text style={Fonts.textRegular}>No team with this name</Text>
      </View>
    )
  ) : (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Text style={Fonts.textRegular}>Somthing went wrong</Text>
    </View>
  )
}
export default TeamsList
