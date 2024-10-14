import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#0002",
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    width: "95%",
    height: "90%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputTextoEvento: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  iconeAddEvento: {
    fontSize: 40,
    color: "#FFFFFF",
  },
  saveButton: {
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 20,
    marginTop: 15,
  },
  saveText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: "#FF5733",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  cancelText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
