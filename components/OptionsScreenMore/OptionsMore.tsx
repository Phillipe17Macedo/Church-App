import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Linking } from "react-native";
import ModalPixPayment from "./ModalPixPayment"; // Certifique-se de ajustar o caminho
import { styles } from "./styles";

export default function OptionsMore() {
  const [pixModalVisible, setPixModalVisible] = useState(false);

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

  const openPixModal = () => setPixModalVisible(true);
  const closePixModal = () => setPixModalVisible(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openPixModal}>
        <Text style={styles.buttonText}>Dizímos & Ofertas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleWordsRedirect}>
        <Text style={styles.buttonText}>Palavras</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleBibleRedirect}>
        <Text style={styles.buttonText}>Bíblia</Text>
      </TouchableOpacity>

      {/* Modal de Pagamento Pix */}
      <ModalPixPayment visible={pixModalVisible} onClose={closePixModal} />
    </View>
  );
}
