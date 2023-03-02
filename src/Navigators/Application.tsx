import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from '@/Hooks'
import { navigationRef } from './utils'
import TeamListContainer from '@/Containers/TeamListContainer'
import { useTranslation } from 'react-i18next'
import TeamDetailsScreen from '@/Containers/teamDetailsContainer'
import { Team } from '@/models/team_interface'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme
  const { t } = useTranslation('nfl_teams')

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen
            name="teamsList"
            options={{ title: t('teamsList') }}
            component={TeamListContainer}
          />
          <Stack.Screen
            name="teamDetails"
            options={({ route }) => ({
              title: (route?.params as Team)?.nickname,
            })}
            component={TeamDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
