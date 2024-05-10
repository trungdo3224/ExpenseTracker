import { StyleSheet, View, Text } from "react-native"
import Button from "./Button"
import { GlobalStyles } from "../../constants/styles"

const ErrorOverlay = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>Something went wrong.</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  )
}

export default ErrorOverlay

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    rowGap: 12,
    backgroundColor: GlobalStyles.colors.primary700
  },
  text: {
    textAlign: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  message: {
    fontSize: 14,
    color: 'white',
  }
})