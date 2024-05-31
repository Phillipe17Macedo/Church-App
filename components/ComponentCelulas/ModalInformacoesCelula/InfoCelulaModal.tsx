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
      <View style={styles.ViewCentralizada}>
        <View style={styles.modalView}>
          {celula ? (
            <>
              <Text style={styles.textoPadraoModal}>Nome da Célula: <Text style={styles.textoInformacaoCelula}>{celula.titulo}</Text></Text>
              <Text style={styles.textoPadraoModal}>Data: <Text style={styles.textoInformacaoCelula}>{celula.data}</Text></Text>
              <Text style={styles.textoPadraoModal}>Horário: <Text style={styles.textoInformacaoCelula}>{celula.horario}</Text></Text>
              <Text style={styles.textoPadraoModal}>Endereço: <Text style={styles.textoInformacaoCelula}>{celula.endereco}</Text></Text>
              <Text style={styles.textoPadraoModal}>Nome do Líder: <Text style={styles.textoInformacaoCelula}>{celula.nomeLider}</Text></Text>
              <Text style={styles.textoPadraoModal}>Número do Líder: <Text style={styles.textoInformacaoCelula}>{celula.numeroLider}</Text></Text>
              <Text style={styles.textoPadraoModal} onPress={handleOpenMaps}><Text style={styles.textoLinkMaps}>Link do Endereço no Google Maps</Text></Text>
              <Text style={styles.textoPadraoModal}>Descrição: <Text style={styles.textoInformacaoCelula}>{celula.descricao}</Text></Text>
            </>
          ) : (
            <Text style={styles.textoPadraoModal}>Carregando...</Text>
          )}
          <TouchableOpacity
            style={[styles.botaoSair]}
            onPress={onClose}
          >
            <Text style={styles.textoBotao}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default InfoCelulaModal;
