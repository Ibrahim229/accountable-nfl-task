import { Team } from '@/models/team_interface'
import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  teamsList: undefined
  teamDetails: Team
}
export type Props = NativeStackScreenProps<RootStackParamList, 'teamDetails'>
export const navigationRef = createNavigationContainerRef<RootStackParamList>()

export function navigate(name: keyof RootStackParamList, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}

export function navigateAndReset(routes = [], index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    )
  }
}

export function navigateAndSimpleReset(name: string, index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      }),
    )
  }
}
