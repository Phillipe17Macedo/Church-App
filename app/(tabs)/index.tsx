import { launchImageLibraryAsync } from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Modal,
  RefreshControl,
} from "react-native";
import { styles } from "../../style/StylesHome/styles";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { isAdmin } from "@/connection/Usuario/authAdmin";
import { buscarEventosDoBanco } from "@/connection/Evento/buscar";
import { salvarEventoNoBanco } from "@/connection/Evento/salvar";
import { removerEventoDoBanco } from "@/connection/Evento/remover";

import ComponentEventos from "../../components/ComponentEventos/ComponentEventos";
import { Evento } from "@/types";
import InfoEventoModal from "@/components/ComponentEventos/ModalInformacoesEvento/InfoEventoModal";
import AddEventoForm from "@/components/ComponentEventos/ModalAddEvento/AddEventoModal";
import ModalConfirmacaoRemocao from "@/components/ComponentEventos/ModalRemocao/ModalConfirmacaoRemocao";

type RemoverEventoButtonProps = {
  onPress: () => void;
};
const RemoverEventoButton = ({ onPress }: RemoverEventoButtonProps) => (
  <TouchableOpacity onPress={onPress} style={styles.removerEventoButton}>
    <Text style={styles.removerEventoButtonText}>Remover</Text>
  </TouchableOpacity>
);

export default function Home() {
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [eventoItems, setEventoItems] = useState<Evento[]>([]);
  const [confirmacaoVisivel, setConfirmacaoVisivel] = useState(false);
  const [eventoIndexToRemove, setEventoIndexToRemove] = useState<number | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(false);
  const [addEventoModalVisible, setAddEventoModalVisible] = useState(false);
  const [infoEventoModalVisible, setInfoEventoModalVisible] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);

  useEffect(() => {
    const initializeAdminStatus = async () => setIsAdminUser(await isAdmin());
    const initializeEventos = async () =>
      setEventoItems(await buscarEventosDoBanco());
    initializeAdminStatus();
    initializeEventos();
  }, []);

  const handleAddEvento = async (eventoData: {
    titulo: string;
    data: string;
    horario: string;
    endereco: string;
    linkEnderecoMaps: string;
    numeroContato: string;
    valor: string;
    descricao: string;
  }) => {
    try {
      const result = await launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [3, 2],
        quality: 1,
      });
      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        const imageName = imageUri.substring(imageUri.lastIndexOf("/") + 1);
        const storage = getStorage();
        const storageReference = storageRef(
          getStorage(),
          `eventos/${imageName}`
        );
        const imageBlob = await fetch(imageUri).then((response) =>
          response.blob()
        );

        await uploadBytes(storageReference, imageBlob);
        const downloadURL = await getDownloadURL(storageReference);

        const eventoId = await salvarEventoNoBanco(
          eventoData.titulo,
          eventoData.data,
          eventoData.horario,
          downloadURL,
          eventoData.endereco,
          eventoData.linkEnderecoMaps,
          eventoData.numeroContato,
          eventoData.valor,
          eventoData.descricao
        );

        const novoEvento: Evento = {
          id: eventoId,
          ...eventoData,
          imagem: downloadURL,
        };
        setEventoItems([...eventoItems, novoEvento]);
        setAddEventoModalVisible(false);
      }
    } catch (error) {
      console.error("Erro ao adicionar evento:", error);
    }
  };

  const exibirConfirmacao = (index: number) => {
    setEventoIndexToRemove(index);
    setConfirmacaoVisivel(true);
  };

  const confirmarRemocao = async () => {
    if (eventoIndexToRemove === null) return;
    const eventoToRemove = eventoItems[eventoIndexToRemove];
    try {
      await removerEventoDoBanco(eventoToRemove.id);
      setEventoItems(eventoItems.filter((_, i) => i !== eventoIndexToRemove));
    } catch (error) {
      console.error("Erro ao remover evento:", error);
    } finally {
      cancelarRemocao();
    }
  };

  const cancelarRemocao = () => {
    setConfirmacaoVisivel(false);
    setEventoIndexToRemove(null);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const eventosDoBanco = await buscarEventosDoBanco();
      setEventoItems(eventosDoBanco);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleEventoPress = (evento: Evento) => {
    setSelectedEvento(evento);
    setInfoEventoModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.areaEventos}>
          {eventoItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleEventoPress(item)}
            >
              <ComponentEventos
                nomeEvento={item.titulo}
                dataEvento={item.data}
                horarioEvento={item.horario}
                imageUri={item.imagem}
                onPress={() => handleEventoPress(item)}
              />
              {isAdminUser && (
                <RemoverEventoButton onPress={() => exibirConfirmacao(index)} />
              )}
            </TouchableOpacity>
          ))}
          {isAdminUser && (
            <TouchableOpacity onPress={() => setAddEventoModalVisible(true)}>
              <View style={styles.containerIconeAddEvento}>
                <Text style={styles.iconeAddEvento}>+</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={addEventoModalVisible}
        animationType="slide"
        transparent={true}
      >
        <AddEventoForm
          onSubmit={handleAddEvento}
          onClose={() => setAddEventoModalVisible(false)}
        />
      </Modal>

      <ModalConfirmacaoRemocao
        visivel={confirmacaoVisivel}
        onConfirmar={confirmarRemocao}
        onCancelar={cancelarRemocao}
      />

      {selectedEvento && (
        <InfoEventoModal
          visible={infoEventoModalVisible}
          evento={selectedEvento}
          onClose={() => setInfoEventoModalVisible(false)}
        />
      )}
    </SafeAreaView>
  );
}
