import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles'; // Certifique-se de ajustar o caminho para o seu arquivo de estilos

const InfoCelulaModal = ({ visible, celula, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {celula && (
            <>
              <Text style={styles.modalText}>Nome da Célula: {celula.nomeCelula}</Text>
              <Text style={styles.modalText}>Horário: {celula.horarioCelula}</Text>
              <Text style={styles.modalText}>Data: {celula.diaCelula}</Text>
              <Text style={styles.modalText}>Endereço: {celula.enderecoCelula}</Text>
              <Text style={styles.modalText}>Link do Endereço Maps: {celula.linkEnderecoMaps}</Text>
              <Text style={styles.modalText}>Número de Contato: {celula.numeroContato}</Text>
            </>
          )}
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={onClose}
          >
            <Text style={styles.textStyle}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CelulaModal;
