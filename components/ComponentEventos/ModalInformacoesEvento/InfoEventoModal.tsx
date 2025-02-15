// InfoEventoModal.tsx

import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, Linking } from "react-native";
import { Evento } from "@/types";
import { styles } from "./styles";
import { Fontisto } from "@expo/vector-icons";
import ContactOptionsModal from "./../ContactOptionsModal/index";

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
  const [contactModalVisible, setContactModalVisible] = useState(false);

  const handleOpenMaps = () => {
    if (evento && evento.linkEnderecoMaps) {
      Linking.openURL(evento.linkEnderecoMaps);
    }
  };

  const openContactOptions = () => {
    setContactModalVisible(true);
  };

  const handleContactOption = (option: string) => {
    if (evento && evento.numeroContato) {
      const formattedNumber = evento.numeroContato.replace(/\D/g, "");
      if (option === "Telefone") {
        Linking.openURL(`tel:${formattedNumber}`);
      } else if (option === "WhatsApp") {
        Linking.openURL(`https://wa.me/${formattedNumber}`);
      } else if (option === "Telegram") {
        Linking.openURL(`https://t.me/+${formattedNumber}`);
      }
    }
    setContactModalVisible(false); // Fecha o modal de contato
  };

  return (
    <>
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
                  Data do Evento:{" "}
                  <Text style={styles.textoInformacaoEvento}>
                    {evento.data}
                  </Text>
                </Text>
                <Text style={styles.textoPadraoModal}>
                  Horário do Evento:{" "}
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
                    <Fontisto name="map" size={18} color="#2196F3" />
                    Link do Endereço no Google Maps
                  </Text>
                </Text>
                <Text style={styles.textoPadraoModal}>
                  Número de Contato:{" "}
                  <Text
                    style={styles.textoNumeroContato}
                    onPress={openContactOptions}
                  >
                    {evento.numeroContato}
                  </Text>
                </Text>
                <Text style={styles.textoPadraoModal}>
                  Valor:{" "}
                  <Text style={styles.textoInformacaoEvento}>
                    {evento.valor}
                  </Text>
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
            <TouchableOpacity style={styles.botaoSair} onPress={onClose}>
              <Text style={styles.textoBotao}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Uso do novo ContactOptionsModal */}
      <ContactOptionsModal
        visible={contactModalVisible}
        onSelectOption={handleContactOption}
        onClose={() => setContactModalVisible(false)}
      />
    </>
  );
};

export default InfoEventoModal;
