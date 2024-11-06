import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#00000199",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  inputTextoCelula: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: "100%",
    height: 40,
    marginBottom: 8,
  },
  containerIconeAddCelula: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    marginBottom: 5,
  },
  iconeAddCelula: {
    fontSize: 30,
    fontWeight: "normal",
    paddingBottom: 3,
    color: "gray",
  },
  confirmButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 15,
    marginTop: 15,
  },
  textButton: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cancelButton: {
    backgroundColor: "#FF5733",
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 15,
  },
});
