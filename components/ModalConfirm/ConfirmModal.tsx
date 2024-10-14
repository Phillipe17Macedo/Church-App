import React from "react";
import { View, Modal, Text, TouchableOpacity } from "react-native";

import { styles } from "./styles";

type ConfirmModalProps = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Tem certeza de que deseja remover este evento?
          </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={onConfirm}
              style={[styles.button, styles.confirmButton]}
            >
              <Text style={styles.textStyle}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onCancel}
              style={[styles.button, styles.cancelButton]}
            >
              <Text style={styles.textStyle}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
