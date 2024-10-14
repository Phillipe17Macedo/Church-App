import { launchImageLibraryAsync } from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Keyboard,
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
import { ModalEventos } from "@/components/ModalEventos/ModalEventos";
import { ConfirmModal } from "@/components/ModalConfirm/ConfirmModal";

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
  const [eventoIndexToRemove, setEventoIndexToRemove] = useState(-1);
  const [refreshing, setRefreshing] = useState(false);

  const [tituloEvento, setTituloEvento] = useState("");
  const [dataDoEvento, setDataDoEvento] = useState("");
  const [horarioDoEvento, setHorarioDoEvento] = useState("");
  const [enderecoDoEvento, setEnderecoDoEvento] = useState("");
  const [linkEnderecoMaps, setLinkEnderecoMaps] = useState("");
  const [numeroContato, setNumeroContato] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalFormVisible, setModalFormVisible] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAdminStatus = async () => {
      const isAdminResult = await isAdmin();
      setIsAdminUser(isAdminResult);
    };
    checkAdminStatus();

    const fetchEventos = async () => {
      try {
        const eventosDoBanco = await buscarEventosDoBanco();
        setEventoItems(eventosDoBanco);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };
    fetchEventos();
  }, []);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleOpenModalForm = () => {
    setModalFormVisible(true);
  };

  const handleCloseModalForm = () => {
    setModalFormVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleAddEvento = async () => {
    try {
      let result = await launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [3, 2],
        quality: 1,
      });
      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        const imageName = imageUri.substring(imageUri.lastIndexOf("/") + 1);
        const storage = getStorage(); // Renomeando a variável
        const storageReference = storageRef(storage, `eventos/${imageName}`); // Renomeando a variável
        const imageBlob = await fetch(imageUri).then((response) =>
          response.blob()
        );
        await uploadBytes(storageReference, imageBlob); // Usando a referência renomeada

        const downloadURL = await getDownloadURL(storageReference); // Usando a referência renomeada
        const eventoId = await salvarEventoNoBanco(
          tituloEvento,
          dataDoEvento,
          horarioDoEvento,
          downloadURL,
          enderecoDoEvento,
          linkEnderecoMaps,
          numeroContato,
          valor,
          descricao
        );
        const novoEvento: Evento = {
          id: eventoId,
          titulo: tituloEvento,
          data: dataDoEvento,
          horario: horarioDoEvento,
          imagem: downloadURL,
          endereco: enderecoDoEvento,
          linkEnderecoMaps: linkEnderecoMaps,
          numeroContato: numeroContato,
          valor: valor,
          descricao: descricao,
        };
        console.log("Novo Evento: ", novoEvento);
        setEventoItems([...eventoItems, novoEvento]);
        setTituloEvento("");
        setDataDoEvento("");
        setHorarioDoEvento("");
        setEnderecoDoEvento("");
        setLinkEnderecoMaps("");
        setNumeroContato("");
        setValor("");
        setDescricao("");
      }
    } catch (error) {
      console.error("Erro ao adicionar evento:", error);
    }
    Keyboard.dismiss();
  };

  const exibirConfirmacao = (index: number) => {
    setEventoIndexToRemove(index);
    setConfirmacaoVisivel(true);
  };

  const cancelarRemocao = () => {
    setConfirmacaoVisivel(false);
    setEventoIndexToRemove(-1);
  };

  const confirmarRemocao = async () => {
    try {
      if (eventoIndexToRemove === -1) {
        console.error("O evento a ser removido não foi encontrado.");
        return;
      }

      const eventoToRemove = eventoItems[eventoIndexToRemove];

      const isAdminUser = await isAdmin();
      if (!isAdminUser) {
        console.error("Apenas usuários administradores podem remover eventos.");
        return;
      }

      const updatedEventoItems = eventoItems.filter(
        (_, i) => i !== eventoIndexToRemove
      );
      setEventoItems(updatedEventoItems);

      await removerEventoDoBanco(eventoToRemove.id);
    } catch (error) {
      console.error("Erro ao remover evento:", error);
    } finally {
      setConfirmacaoVisivel(false);
      setEventoIndexToRemove(-1);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const eventosDoBanco = await buscarEventosDoBanco();
      setEventoItems(eventosDoBanco);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleEventoPress = (evento: any) => {
    console.log("Evento clicado: ", evento);
    setSelectedEvento(evento);
    setModalVisible(true);
  };

  const fetchEventos = async () => {
    setIsLoading(true);
    setError("");
    try {
      const eventosDoBanco = await buscarEventosDoBanco();
      setEventoItems(eventosDoBanco);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      setError("Erro ao buscar informações");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={[styles.areaEventos]}>
          <View style={[styles.areaContainerEvento]}>
            {eventoItems.map((item, index) => {
              return (
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
                    <RemoverEventoButton
                      onPress={() => exibirConfirmacao(index)}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {isAdminUser && (
          <TouchableOpacity onPress={handleOpenModalForm}>
            <View style={[styles.containerIconeAddEvento]}>
              <Text style={[styles.iconeAddEvento]}>+</Text>
            </View>
          </TouchableOpacity>
        )}
        <ModalEventos
          visible={modalFormVisible}
          onClose={handleCloseModalForm}
          onSubmit={handleAddEvento}
          tituloEvento={tituloEvento}
          setTituloEvento={setTituloEvento}
          dataDoEvento={dataDoEvento}
          setDataDoEvento={setDataDoEvento}
          horarioDoEvento={horarioDoEvento}
          setHorarioDoEvento={setHorarioDoEvento}
          enderecoDoEvento={enderecoDoEvento}
          setEnderecoDoEvento={setEnderecoDoEvento}
          linkEnderecoMaps={linkEnderecoMaps}
          setLinkEnderecoMaps={setLinkEnderecoMaps}
          numeroContato={numeroContato}
          setNumeroContato={setNumeroContato}
          valor={valor}
          setValor={setValor}
          descricao={descricao}
          setDescricao={setDescricao}
        />
        <ConfirmModal
          visible={confirmacaoVisivel}
          onConfirm={confirmarRemocao}
          onCancel={cancelarRemocao}
        />
      </ScrollView>
      <InfoEventoModal
        visible={modalVisible}
        evento={selectedEvento}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}
