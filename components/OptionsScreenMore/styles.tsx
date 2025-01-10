import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    // padding: 16,
    // backgroundColor: "#F9F9F9",
  },
  button: {
    padding: 15,
    backgroundColor: "#3E4A59",
    borderRadius: 8,
    marginVertical: 8,
    // alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonAdd: {
    padding: 15,
    backgroundColor: "#CACACA",
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
  },
  optionItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#3E4A59",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  optionContent: {
    width: "65%",
    // backgroundColor: '#FFF'
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  optionSubtitle: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  optionActions: {
    flexDirection: "row",
  },
  actionText: {
    marginHorizontal: 8,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
