// ContactOptionsModal.tsx

import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles"; // Estilos específicos para este modal

interface ContactOptionsModalProps {
  visible: boolean;
  onSelectOption: (option: string) => void;
  onClose: () => void;
}

const ContactOptionsModal: React.FC<ContactOptionsModalProps> = ({
  visible,
  onSelectOption,
  onClose,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.ViewCentralizada}>
        <View style={styles.modalView}>
          <Text style={styles.textoPadraoModal}>
            Escolha o aplicativo para entrar em contato:
          </Text>
          <TouchableOpacity
            style={styles.opcaoBotao}
            onPress={() => onSelectOption("Telefone")}
          >
            <Text style={styles.opcaoTexto}>Telefone</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.opcaoBotao}
            onPress={() => onSelectOption("WhatsApp")}
          >
            <Text style={styles.opcaoTexto}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.opcaoBotao}
            onPress={() => onSelectOption("Telegram")}
          >
            <Text style={styles.opcaoTexto}>Telegram</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoCancelar} onPress={onClose}>
            <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ContactOptionsModal;
