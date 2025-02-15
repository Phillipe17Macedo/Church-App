import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#040316",
    //paddingBottom: 100,
  },
  areaEventos: {
    paddingHorizontal: 25,
    marginBottom: 100,
  },
  areaContainerEvento: {
    marginTop: 10,
  },
  containerIconeAddEvento: {
    width: "100%",
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    //marginBottom: 100,
    marginTop: 15,
    alignSelf: "center",
  },
  iconeAddEvento: {
    fontSize: 30,
    fontWeight: "normal",
    paddingBottom: 3,
    color: "gray",
  },
  removerEventoButton: {
    // position: "absolute",
    top: 22,
    right: 8,
    backgroundColor: "#3E4A59",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#B8D9D3",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  removerEventoButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    minWidth: "40%",
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#2196F3",
  },
  cancelButton: {
    backgroundColor: "#FF5733",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
