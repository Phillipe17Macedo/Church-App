import { launchImageLibraryAsync } from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { 
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Keyboard,
  Modal,
  RefreshControl,
} from 'react-native';
import { styles } from '../../style/StylesCelulas/styles';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { isAdmin } from '~/utils/Usuario/authAdmin';
import { buscarCelulaDoBanco } from '~/utils/Celula/buscar';
import { salvarCelulaNoBanco } from '~/utils/Celula/salvar';
import { removerCelulaDoBanco } from '~/utils/Celula/remover';

import ComponentCelulas from '~/components/ComponentCelulas/ComponentCelulas';

type RemoverCelulaButtonProps = {
  onPress: () => void;
}

const RemoverCelulaButton = ({onPress}: RemoverCelulaButtonProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.removerCelulaButton]}>
    <Text style={[styles.removerCelulaButtonText]}>Remover</Text>
  </TouchableOpacity>
);
type ConfirmacaoRemocaoPros = {
  visivel: boolean;
  onConfirmar: () => void;
  onCancelar: () => void;
};
const ConfirmarRemocao = ({visivel, onConfirmar, onCancelar}: ConfirmacaoRemocaoPros) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visivel}
      onRequestClose={onCancelar}
      >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Tem certeza de que deseja remover este evento?</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={onConfirmar} style={[styles.button, styles.confirmButton]}>
              <Text style={styles.textStyle}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancelar} style={[styles.button, styles.cancelButton]}>
              <Text style={styles.textStyle}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default function Celulas() {
  return (
    <View style={styles.container}>

    </View>
  );
}