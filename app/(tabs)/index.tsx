/* eslint-disable prettier/prettier */
import { launchImageLibraryAsync } from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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
  ActivityIndicator
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

type RemoverEventoButtonProps = {
  onPress: () => void;
};
const RemoverEventoButton = ({ onPress }: RemoverEventoButtonProps) => (
  <TouchableOpacity onPress={onPress} style={styles.removerEventoButton}>
    <Text style={styles.removerEventoButtonText}>Remover</Text>
  </TouchableOpacity>
);
type ConfirmacaoRemocaoProps = {
  visivel: boolean;
  onConfirmar: () => void;
  onCancelar: () => void;
};
const ConfirmacaoRemocao = ({
  visivel,
  onConfirmar,
  onCancelar,
}: ConfirmacaoRemocaoProps) => {
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
            Tem certeza de que deseja remover este evento?
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
};
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
  const [selectedEvento, setSelectedEvento] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
    setError('');
    try {
      const eventosDoBanco = await buscarEventosDoBanco();
      setEventoItems(eventosDoBanco);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      setError('Erro ao buscar informações');
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
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.containerInputNewEvento]}
          >
            <TextInput
              style={[styles.inputTextoEvento]}
              keyboardType="default"
              placeholder="Nome do Evento"
              value={tituloEvento}
              onChangeText={(nomeEvento) => setTituloEvento(nomeEvento)}
            />
            <TextInput
              style={[styles.inputTextoEvento]}
              keyboardType="default"
              placeholder="Data do Evento"
              value={dataDoEvento}
              onChangeText={(dataEvento) => setDataDoEvento(dataEvento)}
            />
            <TextInput
              style={[styles.inputTextoEvento]}
              keyboardType="default"
              placeholder="Horário do Evento"
              value={horarioDoEvento}
              onChangeText={(horarioEvento) =>
                setHorarioDoEvento(horarioEvento)
              }
            />
            <TextInput style={[styles.inputTextoEvento]}
              keyboardType="default"
              placeholder="Endereço do Evento"
              value={enderecoDoEvento}
              onChangeText={(enderecoEvento) => setEnderecoDoEvento(enderecoEvento)}
            />
            <TextInput style={[styles.inputTextoEvento]}
              keyboardType="default"
              placeholder="Link do Endereço do Evento"
              value={linkEnderecoMaps}
              onChangeText={(linkEvento) => setLinkEnderecoMaps(linkEvento)}
            />
            <TextInput style={[styles.inputTextoEvento]}
              keyboardType="default"
              placeholder="Número de Contato"
              value={numeroContato}
              onChangeText={(numeroEvento) => setNumeroContato(numeroEvento)}
            />
            <TextInput style={[styles.inputTextoEvento]}
              keyboardType="default"
              placeholder="Valor do Evento"
              value={valor}
              onChangeText={(valorEvento) => setValor(valorEvento)}
            />
            <TextInput style={[styles.inputTextoEvento]}
              keyboardType="default"
              placeholder="Descrição do Evento"
              value={descricao}
              onChangeText={(descricaoEvento) => setDescricao(descricaoEvento)}
            />
            <TouchableOpacity onPress={() => handleAddEvento()}>
              <View style={[styles.containerIconeAddEvento]}>
                <Text style={[styles.iconeAddEvento]}>+</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        )}
        <ConfirmacaoRemocao
          visivel={confirmacaoVisivel}
          onConfirmar={confirmarRemocao}
          onCancelar={cancelarRemocao}
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
