import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

type ModalConfirmacaoRemocaoProps = {
  visivel: boolean;
  onConfirmar: () => void;
  onCancelar: () => void;
};

export default function ModalConfirmacaoRemocao({
  visivel,
  onConfirmar,
  onCancelar,
}: ModalConfirmacaoRemocaoProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visivel}
      onRequestClose={onCancelar}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Tem certeza de que deseja remover esta opção?
          </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={onConfirmar}
              style={[styles.button, styles.confirmButton]}
            >
              <Text style={styles.textStyle}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onCancelar}
              style={[styles.button, styles.cancelButton]}
            >
              <Text style={styles.textStyle}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
