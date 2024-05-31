import React from "react";
import { Modal, View, Text, TouchableOpacity, Linking } from "react-native";
import { Evento } from "@/types";
import { styles } from "./styles";

interface InfoEventoModalProps {
  visible: boolean;
  evento: Evento | null;
  onClose: () => void;
}

const InfoEventoModal: React.FC<InfoEventoModalProps> = ({
  visible,
  evento,
  onClose,
}) => {
  const handleOpenMaps = () => {
    if (evento && evento.linkEnderecoMaps) {
      Linking.openURL(evento.linkEnderecoMaps);
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
          {evento ? (
            <>
              <Text style={styles.textoPadraoModal}>
                Nome do Evento:{" "}
                <Text style={styles.textoInformacaoEvento}>
                  {evento.titulo}
                </Text>
              </Text>
              <Text style={styles.textoPadraoModal}>
                Data:{" "}
                <Text style={styles.textoInformacaoEvento}>{evento.data}</Text>
              </Text>
              <Text style={styles.textoPadraoModal}>
                Horário:{" "}
                <Text style={styles.textoInformacaoEvento}>
                  {evento.horario}
                </Text>
              </Text>
              <Text style={styles.textoPadraoModal}>
                Endereço:{" "}
                <Text style={styles.textoInformacaoEvento}>
                  {evento.endereco}
                </Text>
              </Text>
              <Text style={styles.textoPadraoModal} onPress={handleOpenMaps}>
                <Text style={styles.textoLinkMaps}>
                  Link do Endereço no Google Maps
                </Text>
              </Text>
              <Text style={styles.textoPadraoModal}>
                Número do Responsável:{" "}
                <Text style={styles.textoInformacaoEvento}>
                  {evento.numeroContato}
                </Text>
              </Text>
              <Text style={styles.textoPadraoModal}>
                Valor:{" "}
                <Text style={styles.textoInformacaoEvento}>{evento.valor}</Text>
              </Text>
              <Text style={styles.textoPadraoModal}>
                Descrição:{" "}
                <Text style={styles.textoInformacaoEvento}>
                  {evento.descricao}
                </Text>
              </Text>
            </>
          ) : (
            <Text style={styles.textoPadraoModal}>Carregando...</Text>
          )}
          <TouchableOpacity style={[styles.botaoSair]} onPress={onClose}>
            <Text style={styles.textoBotao}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default InfoEventoModal;
