import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250,
    alignSelf: 'center',
    backgroundColor: '#3E4A59',
    //alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 10,
    borderRadius: 10,
    marginBottom: 95
  },
  constainerOpcoes: {
    backgroundColor: '#878787',
    padding: 10,
    margin: 10,
    borderRadius: 5
  },
  textoOpcoes: {
    color: 'white',
    fontSize: 21,
    fontWeight: 'bold',
    fontVariant: ["small-caps"]
  }
});