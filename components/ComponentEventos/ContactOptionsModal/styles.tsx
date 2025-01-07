// contactOptionsStyles.ts

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  ViewCentralizada: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  textoPadraoModal: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  opcaoBotao: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    alignItems: "center",
  },
  opcaoTexto: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  botaoCancelar: {
    width: "100%",
    padding: 10,
    marginTop: 15,
    backgroundColor: "#d9534f",
    borderRadius: 5,
    alignItems: "center",
  },
  textoBotaoCancelar: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
