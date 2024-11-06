import React from "react";
import { View, Text, TouchableOpacity, Alert, Linking } from "react-native";
import { styles } from "./styles";

export default function OptionsMore() {
  const pixLink =
    "pix://00020126330014BR.GOV.BCB.PIX0114+5511999999990520Pagamento1234500203BR5925Nome+da+Organizacao6009SAO+PAULO62070503***";

  const handleBibleRedirect = () => {
    Alert.alert(
      "Redirecionar para a Bíblia Online",
      "Deseja ir para a Bíblia Online?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Ir",
          onPress: () => Linking.openURL("https://www.bibliaon.com/"),
        },
      ]
    );
  };

  const handleWordsRedirect = () => {
    Alert.alert(
      "Redirecionar para o YouTube",
      "Deseja ir para o canal do YouTube?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Ir",
          onPress: () =>
            Linking.openURL("https://www.youtube.com/@praluizioasilva"),
        },
      ]
    );
  };

  const handlePixRedirect = () => {
    Alert.alert(
      "Pagamento via Pix",
      "Deseja abrir o app de pagamento para fazer um Pix?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Ir",
          onPress: async () => {
            const supported = await Linking.canOpenURL(pixLink);
            if (supported) {
              Linking.openURL(pixLink);
            } else {
              Alert.alert(
                "Erro",
                "Nenhum app de pagamento compatível foi encontrado."
              );
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePixRedirect}>
        <Text style={styles.buttonText}>Dizímos & Ofertas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleWordsRedirect}>
        <Text style={styles.buttonText}>Palavras</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleBibleRedirect}>
        <Text style={styles.buttonText}>Bíblia</Text>
      </TouchableOpacity>
    </View>
  );
}
