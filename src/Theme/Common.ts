/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from 'react-native'
import buttonStyles from './components/Buttons'
import { CommonParams } from './theme'

export default function <C>({ Colors, ...args }: CommonParams<C>) {
  return {
    button: buttonStyles({ Colors, ...args }),
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: Colors.primary,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      textInput: {
        borderColor: Colors.white,
        borderRadius: 8,
        backgroundColor: Colors.inputBackground,
        color: Colors.text,
        minHeight: 50,
        marginTop: 20,
        paddingHorizontal: 20,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        zIndex: 1,
      },
      logo: {
        height: 40,
        width: 40,
        mode: 'cover',
      },
      listItem: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 6,
        borderBottomRightRadius: 6,
      },
      container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      header: {
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      largeLogo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
      },
      displayName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
      },
      nickname: {
        fontSize: 18,
        color: '#888',
      },
      content: {
        paddingHorizontal: 20,
        paddingVertical: 30,
      },
      label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 8,
      },
      value: {
        fontSize: 16,
        marginBottom: 20,
      },
      colorBox: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
      },
      link: {
        fontSize: 16,
        color: Colors.linkColor,
        textDecorationLine: 'underline',
        marginTop: 4,
      },
    }),
  }
}
