import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#040316',
  },
  containerInput: {
    backgroundColor: '#3E4A59',
    alignItems: 'center',
    justifyContent:'space-between',
    flexDirection: 'column',
    marginTop: 100,
    paddingTop: 20,
    paddingBottom: 5,
    borderRadius: 30,
    height: 'auto',
    shadowOffset:{width:5,height:5},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,  
  },
  inputDados: {
    backgroundColor: '#fff',
    height: 40,
    width: '90%',
    borderRadius: 15,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#CACACA',
    color: '#202022',
    fontWeight: 'bold',
    fontSize: 20,
    fontVariant: ['small-caps'],
    marginBottom: 15,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  containerRedefinir: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
    alignSelf: 'baseline',
    left: 28,
  },
  linkRedefinir: {
    color: '#DAFDBA',
    fontWeight: 'bold',
    fontSize: 16,
    fontVariant: ['small-caps'], 
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#CACACA',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 18,
    marginTop: 15,
    marginBottom: 15,
    width: '90%',
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    shadowOffset:{width:10,height:10},
    shadowOpacity:0.5,
    shadowRadius:10,
    elevation:5,  
    borderWidth: 1,
    borderColor: '#CACACA',
  },
  buttonText: {
    color: '#012030',
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
    fontVariant: ['small-caps'],
  },
  containerTextLink: {
    marginTop: 30,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DAFDBA',
    padding: 5,
    borderRadius: 10,
  },
  textLink: {
    alignSelf: 'center',
    fontSize: 18,
    color: '#202022',
    fontWeight: 'bold',
    fontVariant: ['small-caps'],
    padding: 4,
  },
});