import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    removerEventoButton: {
        position: 'absolute',
        top: 22,
        right: 8,
        backgroundColor: '#3E4A59',
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#B8D9D3',
        shadowOffset:{width:5,height:5},
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,  
      },
      removerEventoButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        minWidth: '40%',
        alignItems: 'center',
      },
      confirmButton: {
        backgroundColor: '#2196F3',
      },
      cancelButton: {
        backgroundColor: '#FF5733',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
});