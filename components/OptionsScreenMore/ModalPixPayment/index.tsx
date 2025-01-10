import React from "react";
import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import QRCode from "react-native-qrcode-svg";
import { styles } from "./styles";

interface ModalPixPaymentProps {
  visible: boolean;
  onClose: () => void;
  pixCode: string;
}

const ModalPixPayment: React.FC<ModalPixPaymentProps> = ({
  visible,
  onClose,
  pixCode,
}) => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(pixCode);
    Alert.alert(
      "Código Pix copiado",
      "Código Pix copiado para a área de transferência. Cole no app de pagamento."
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Pagamento via Pix</Text>
          <Text style={styles.message}>
            Escaneie o QR code abaixo com o app do banco ou copie o código para
            pagamento Pix:
          </Text>
          <View style={styles.qrContainer}>
            <QRCode value={pixCode} size={200} />
          </View>
          <TouchableOpacity style={styles.button} onPress={copyToClipboard}>
            <Text style={styles.buttonText}>Copiar Código Pix</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalPixPayment;
