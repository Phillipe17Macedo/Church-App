import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  ViewCentralizada: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  botaoSair: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textoBotao: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textoPadraoModal: {
    marginBottom: 15,
    textAlign: "justify",
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    fontSize: 18, 
    color: '#011F26',
    fontVariant: ['small-caps']
  },
  textoInformacaoEvento: {
    fontWeight: 'normal',
    fontSize: 14,
    color: '#011F26',
    //textDecorationLine: 'underline',
    fontVariant: ['small-caps'],
  },
  textoLinkMaps: {
    fontWeight: 'bold',
    color: '#2196F3',
    fontSize: 15,
    alignContent: 'space-between'
  },
  textoNumeroContato: {
    fontWeight: 'bold',
    color: "#2196F3",
    fontSize: 15,
  }
});
