import React from 'react';
import { Modal, View, Text, TouchableOpacity, Linking } from 'react-native';
import { Celula } from '@/types';
import { styles } from './styles';

interface InfoCelulaModalProps {
  visible: boolean;
  celula: Celula | null;
  onClose: () => void;
}

const InfoCelulaModal: React.FC<InfoCelulaModalProps> = ({ visible, celula, onClose }) => {
  const handleOpenMaps = () => {
    if (celula && celula.linkEnderecoMaps) {
      Linking.openURL(celula.linkEnderecoMaps);
    }
  };
  return (
<Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {celula ? (
            <>
              <Text style={styles.modalText}>Nome da Célula: {celula.titulo}</Text>
              <Text style={styles.modalText}>Data: {celula.data}</Text>
              <Text style={styles.modalText}>Horário: {celula.horario}</Text>
              <Text style={styles.modalText}>Endereço: {celula.endereco}</Text>
              <Text style={styles.modalText}>Nome do Líder: {celula.nomeLider}</Text>
              <Text style={styles.modalText}>Número do Líder: {celula.numeroLider}</Text>
              <Text style={styles.modalText} onPress={handleOpenMaps}>Link do Endereço Maps: {celula.linkEnderecoMaps}</Text>
              <Text style={styles.modalText}>Descrição: {celula.descricao}</Text>
            </>
          ) : (
            <Text style={styles.modalText}>Carregando...</Text>
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

export default InfoCelulaModal;
