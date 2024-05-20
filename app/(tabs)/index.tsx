/* eslint-disable prettier/prettier */
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
import { styles } from '../../style/StylesHome/styles';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { isAdmin } from '~/utils/Usuario/authAdmin';
import { buscarEventosDoBanco } from '~/utils/Evento/buscar';
import { salvarEventoNoBanco } from '~/utils/Evento/salvar';
import { removerEventoDoBanco } from '~/utils/Evento/remover';

import ComponentEventos from '../../components/ComponentEventos/ComponentEventos';

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
const ConfirmacaoRemocao = ({ visivel, onConfirmar, onCancelar }: ConfirmacaoRemocaoProps) => {
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
export default function Home() {
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [eventoItems, setEventoItems] = useState<Evento[]>([]);
  const [confirmacaoVisivel, setConfirmacaoVisivel] = useState(false);
  const [eventoIndexToRemove, setEventoIndexToRemove] = useState(-1);
  const [refreshing, setRefreshing] = useState(false);

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
        console.error('Erro ao buscar eventos:', error);
      }
    };
    fetchEventos();
  }, []);

  const [tituloEvento, setTituloEvento] = useState('');
  const [dataDoEvento, setDataDoEvento] = useState('');
  const [horarioDoEvento, setHorarioDoEvento] = useState('');

  const handleAddEvento = async () => {
    try {
      let result = await launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [3, 2],
        quality: 1,
      });
      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        const imageName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
        const storage = getStorage(); // Renomeando a variável
        const storageReference = storageRef(storage, `eventos/${imageName}`); // Renomeando a variável
        const imageBlob = await fetch(imageUri).then((response) => response.blob());
        await uploadBytes(storageReference, imageBlob); // Usando a referência renomeada

        const downloadURL = await getDownloadURL(storageReference); // Usando a referência renomeada
        const eventoId = await salvarEventoNoBanco(tituloEvento, dataDoEvento, horarioDoEvento, downloadURL);
        const novoEvento = {
          id: eventoId,
          nomeEvento: tituloEvento,
          dataEvento: dataDoEvento,
          horarioEvento: horarioDoEvento,
          imageUri: downloadURL,
        };
        setEventoItems([
          ...eventoItems,
          novoEvento
        ]);
        setTituloEvento('');
        setDataDoEvento('');
        setHorarioDoEvento('');
      }
    } catch (error) {
      console.error('Erro ao adicionar evento:', error);
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
        console.error('O evento a ser removido não foi encontrado.');
        return;
      }

      const eventoToRemove = eventoItems[eventoIndexToRemove];

      const isAdminUser = await isAdmin();
      if (!isAdminUser) {
        console.error('Apenas usuários administradores podem remover eventos.');
        return;
      }

      const updatedEventoItems = eventoItems.filter((_, i) => i !== eventoIndexToRemove);
      setEventoItems(updatedEventoItems);

      await removerEventoDoBanco(eventoToRemove.id);
    } catch (error) {
      console.error('Erro ao remover evento:', error);
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
      console.error('Erro ao buscar eventos:', error);
    } finally {
      setRefreshing(false);
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
            {
              eventoItems.map((item, index) => {
                return (
                  <TouchableOpacity key={index}>
                    <ComponentEventos
                      nomeEvento={item.titulo}
                      dataEvento={item.data}
                      horarioEvento={item.horario}
                      imageUri={item.imagem}
                    />
                    {isAdminUser && <RemoverEventoButton onPress={() => exibirConfirmacao(index)} />}
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>

        {isAdminUser && (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.containerInputNewEvento]}
          >
            <TextInput
              style={[styles.inputTextoEvento]}
              keyboardType='default'
              placeholder='Nome do Evento'
              value={tituloEvento}
              onChangeText={(nomeEvento) => setTituloEvento(nomeEvento)}
            />
            <TextInput
              style={[styles.inputTextoEvento]}
              keyboardType='default'
              placeholder='Data do Evento'
              value={dataDoEvento}
              onChangeText={(dataEvento) => setDataDoEvento(dataEvento)}
            />
            <TextInput
              style={[styles.inputTextoEvento]}
              keyboardType='default'
              placeholder='Horário do Evento'
              value={horarioDoEvento}
              onChangeText={(horarioEvento) => setHorarioDoEvento(horarioEvento)}
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
    </SafeAreaView>
  );
}