export interface AllTeamsResponse {
  sports: Sport[]
}

export interface Sport {
  id: string
  uid: string
  name: string
  slug: string
  leagues: League[]
}

export interface League {
  id: string
  uid: string
  name: string
  abbreviation: string
  shortName: string
  slug: string
  teams: TeamElement[]
}

export interface TeamElement {
  team: Team
}

export interface Team {
  id: string
  uid: string
  slug: string
  abbreviation: string
  displayName: string
  shortDisplayName: string
  name: string
  nickname: string
  location: string
  color: string
  alternateColor: string
  isActive: boolean
  isAllStar: boolean
  logos: Logo[]
  links: Link[]
}

export interface Link {
  language: Language
  rel: LinkRel[]
  href: string
  text: Text
  shortText?: Text
  isExternal: boolean
  isPremium: boolean
}

export type Language = 'en-US' | 'en'

export type LinkRel =
  | 'clubhouse'
  | 'desktop'
  | 'team'
  | 'roster'
  | 'stats'
  | 'schedule'
  | 'depthchart'
  | 'tickets'

export type Text =
  | 'Clubhouse'
  | 'Roster'
  | 'Statistics'
  | 'Schedule'
  | 'Depth Chart'
  | 'Tickets'

export interface Logo {
  href: string
  alt: string
  rel: LogoRel[]
  width: number
  height: number
}

export type LogoRel = 'full' | 'default' | 'dark' | 'scoreboard'
