import { useTheme } from '@/Hooks'
import { Linking } from 'react-native'
import { Props } from '@/Navigators/utils'
import React from 'react'
import { View, Text, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const TeamDetailsScreen = ({ route }: Props) => {
  const { Common } = useTheme()
  const team = route.params

  return (
    <ScrollView>
      <View style={Common.container}>
        <View style={Common.header}>
          <Image
            source={{ uri: team.logos[0].href }}
            style={Common.largeLogo}
          />
          <Text style={Common.displayName}>{team.displayName}</Text>
          <Text style={Common.nickname}>{team.nickname}</Text>
        </View>
        <View style={Common.content}>
          <Text style={Common.label}>ID:</Text>
          <Text style={Common.value}>{team.id}</Text>

          <Text style={Common.label}>UID:</Text>
          <Text style={Common.value}>{team.uid}</Text>

          <Text style={Common.label}>Slug:</Text>
          <Text style={Common.value}>{team.slug}</Text>

          <Text style={Common.label}>Abbreviation:</Text>
          <Text style={Common.value}>{team.abbreviation}</Text>

          <Text style={Common.label}>Location:</Text>
          <Text style={Common.value}>{team.location}</Text>

          <Text style={Common.label}>Color:</Text>
          <View
            style={[Common.colorBox, { backgroundColor: `#${team.color}` }]}
          />

          <Text style={Common.label}>Alternate Color:</Text>
          <View
            style={[
              Common.colorBox,
              { backgroundColor: `#${team.alternateColor}` },
            ]}
          />

          <Text style={Common.label}>Links:</Text>
          {team.links.map((link, i) => (
            <Text
              key={i}
              style={Common.link}
              onPress={() => Linking.openURL(link.href)}
            >
              {link.text}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default TeamDetailsScreen
