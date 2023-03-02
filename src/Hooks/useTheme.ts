import { DefaultTheme } from '@react-navigation/native'
import {
  Common,
  Fonts,
  Gutters,
  Images,
  Layout,
  DefaultVariables,
} from '@/Theme'
import {
  ThemeVariables,
  Theme,
  ThemeNavigationTheme,
  ThemeNavigationColors,
} from '@/Theme/theme'

export default function () {
  let variables: Partial<ThemeVariables> = {}

  const themeVariables = mergeVariables(variables)

  const fonts = Fonts(themeVariables)
  const gutters = Gutters(themeVariables)
  const images = Images(themeVariables)
  const layout = Layout(themeVariables)
  const common = Common({
    ...themeVariables,
    Layout: Layout(themeVariables),
    Gutters: Gutters(themeVariables),
    Fonts: Fonts(themeVariables),
    Images: Images(themeVariables),
  })

  // Build the default theme
  const baseTheme: Theme<
    typeof fonts,
    typeof gutters,
    typeof images,
    typeof layout,
    typeof common
  > = {
    Fonts: fonts,
    Gutters: gutters,
    Images: images,
    Layout: layout,
    Common: common,
    ...themeVariables,
  }

  // Merge and return the current Theme
  return buildTheme(baseTheme, formatTheme(themeVariables, {}))
}

/**
 * Generate Theme with theme variables
 */
const formatTheme = <F, G, I, L, C>(
  variables: ThemeVariables,
  theme: Partial<Theme<F, G, I, L, C>>,
) => {
  return Object.entries(theme).reduce((acc, [name, generate]) => {
    return {
      ...acc,
      [name]: (generate as any)(variables),
    }
  }, theme)
}

/**
 * Merge all variables for building the theme
 * baseTheme <- currentTheme
 */
const mergeVariables = (themeConfig: Partial<ThemeVariables>) => {
  return Object.entries(DefaultVariables).reduce((acc, [group, vars]) => {
    const theme:
      | Record<keyof typeof DefaultVariables, typeof vars>
      | undefined = (themeConfig as any)[group]

    return {
      ...acc,
      [group]: {
        ...vars,
        ...(theme || {}),
      },
    }
  }, DefaultVariables)
}

/**
 * Provide all the theme exposed with useTheme()
 */
const buildTheme = <F, G, I, L, C>(
  baseTheme: Theme<F, G, I, L, C>,
  themeConfig: Partial<Theme<F, G, I, L, C>>,
) => {
  return {
    ...mergeTheme(baseTheme, themeConfig),
    NavigationTheme: mergeNavigationTheme(
      DefaultTheme,
      baseTheme.NavigationColors,
    ),
  }
}

/**
 * Merge theme from baseTheme <- currentTheme
 */
const mergeTheme = <F, G, I, L, C>(
  baseTheme: Theme<F, G, I, L, C>,
  theme: Partial<Theme<F, G, I, L, C>>,
) =>
  Object.entries(baseTheme).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: {
        ...((value as any) || {}),
        ...((theme as any)[key] || {}),
      },
    }),
    baseTheme,
  ) as typeof baseTheme
/**
 * Merge the React Navigation Theme
 *
 * @param reactNavigationTheme
 * @param overrideColors
 * @return {{colors}}
 */
const mergeNavigationTheme = (
  reactNavigationTheme: ThemeNavigationTheme,
  overrideColors: Partial<ThemeNavigationColors>,
) => ({
  ...reactNavigationTheme,
  colors: {
    ...reactNavigationTheme.colors,
    ...overrideColors,
  },
})
