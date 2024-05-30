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
import { isAdmin } from '@/utils/Usuario/authAdmin';
import { buscarCelulaDoBanco } from '@/utils/Celula/buscar';
import { salvarCelulaNoBanco } from '@/utils/Celula/salvar';
import { removerCelulaDoBanco } from '@/utils/Celula/remover';

import InfoCelulaModal from '@/components/ComponentCelulas/ModalInformacoesCelula/InfoCelulaModal';
import ComponentCelulas from '@/components/ComponentCelulas/ComponentCelulas';

type RemoverCelulaButtonProps = {
  onPress: () => void;
};

const RemoverCelulaButton = ({ onPress }: RemoverCelulaButtonProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.removerCelulaButton]}>
    <Text style={[styles.removerCelulaButtonText]}>Remover</Text>
  </TouchableOpacity>
);

type ConfirmacaoRemocaoPros = {
  visivel: boolean;
  onConfirmar: () => void;
  onCancelar: () => void;
};

const ConfirmarRemocao = ({ visivel, onConfirmar, onCancelar }: ConfirmacaoRemocaoPros) => {
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
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [celulaItems, setCelulaItems] = useState<Celula[]>([]);
  const [confirmacaoVisivel, setConfirmacaoVisivel] = useState(false);
  const [celulaIndexToRemove, setCelulaIndexToRemove] = useState(-1);
  const [refreshing, setRefreshing] = useState(false);

  const [tituloCelula, setTituloCelula] = useState('');
  const [dataCelula, setDataCelula] = useState('');
  const [horarioCelula, setHorarioCelula] = useState('');
  const [enderecoCelula, setEnderecoCelula] = useState('');
  const [linkEnderecoMaps, setLinkEnderecoMaps] = useState('');
  const [nomeLider, setNomeLider] = useState('');
  const [numeroLider, setNumeroLider] = useState('');
  const [descricao, setDescricao] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCelula, setSelectedCelula] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const isAdminResult = await isAdmin();
      setIsAdminUser(isAdminResult);
    };
    checkAdminStatus();

    const fetchCelulas = async () => {
      try {
        const celulasDoBanco = await buscarCelulaDoBanco();
        setCelulaItems(celulasDoBanco);
      } catch (error) {
        console.error('Erro ao buscar celulas:', error);
      }
    };
    fetchCelulas();
  }, []);

  const handleAddCelula = async () => {
    try {
      let result = await launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [3, 2],
        quality: 1,
      });
      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        const imageName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
        const storage = getStorage();
        const storageReference = storageRef(storage, `celulas/${imageName}`);
        const imageBlob = await fetch(imageUri).then((response) => response.blob());
        await uploadBytes(storageReference, imageBlob);

        const downloadURL = await getDownloadURL(storageReference);
        console.log('URL da Imagem: ', downloadURL);
        const celulaId = await salvarCelulaNoBanco(tituloCelula, dataCelula, horarioCelula, enderecoCelula, downloadURL, linkEnderecoMaps, nomeLider, numeroLider, descricao);
        const novaCelula = {
          id: celulaId,
          nomeCelula: tituloCelula,
          diaCelula: dataCelula,
          horarioCelula: horarioCelula,
          enderecoCelula: enderecoCelula,
          imageUri: downloadURL,
          linkEnderecoMaps: linkEnderecoMaps,
          nomeLider: nomeLider,
          numeroLider: numeroLider,
          descricao: descricao
        };
        console.log('Nova Célula: ', novaCelula);
        setCelulaItems([
          ...celulaItems,
          novaCelula,
        ]);
        setTituloCelula('');
        setDataCelula('');
        setHorarioCelula('');
        setEnderecoCelula('');
        setLinkEnderecoMaps('');
        setNomeLider('');
        setNumeroLider('');
        setDescricao('');
      }
    } catch (error) {
      console.error('Erro ao adicionar celula:', error);
    }
    Keyboard.dismiss();
  };

  const exibirConfirmacao = (index: number) => {
    setCelulaIndexToRemove(index);
    setConfirmacaoVisivel(true);
  };

  const cancelarRemocao = () => {
    setConfirmacaoVisivel(false);
    setCelulaIndexToRemove(-1);
  };

  const confirmarRemocao = async () => {
    try {
      if (celulaIndexToRemove === -1) {
        console.error('A Celula a ser removida não foi encontrada.');
        return;
      }
      const celulaToRemove = celulaItems[celulaIndexToRemove];

      const isAdminUser = await isAdmin();
      if (!isAdminUser) {
        console.error('Apenas usuários administradores podem remover celulas.');
        return;
      }

      const updateCelulaItems = celulaItems.filter((_, i) => i !== celulaIndexToRemove);
      setCelulaItems(updateCelulaItems);

      await removerCelulaDoBanco(celulaToRemove.id);
    } catch (error) {
      console.error('Erro ao remover celula:', error);
    } finally {
      setConfirmacaoVisivel(false);
      setCelulaIndexToRemove(-1);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const celulasDoBanco = await buscarCelulaDoBanco();
      setCelulaItems(celulasDoBanco);
    } catch (error) {
      console.error('Erro ao buscar Celulas:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleCelulaPress = (celula: any) => {
    console.log("Celula clicada: ", celula);
    setSelectedCelula(celula);
    setModalVisible(true);
    console.log("Estado do setVisible: ", setModalVisible);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar style='light' />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={[styles.areaCelulas]}>
          <View style={[styles.areaContainerCelula]}>
            {
              celulaItems.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => handleCelulaPress(item)}>
                    <ComponentCelulas
                      nomeCelula={item.titulo}
                      dataCelula={item.data}
                      horarioCelula={item.horario}
                      enderecoCelula={item.endereco}
                      imageUri={item.imagem}
                      onPress={() => handleCelulaPress(item)}
                    />
                    {isAdminUser && <RemoverCelulaButton onPress={() => exibirConfirmacao(index)} />}
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>

        {isAdminUser && (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.containerInputNewCelula]}
          >
            <TextInput
              style={[styles.inputTextoCelula]}
              keyboardType='default'
              placeholder='Nome da Célula'
              value={tituloCelula}
              onChangeText={(nomeCelula) => setTituloCelula(nomeCelula)}
            />
            <TextInput
              style={[styles.inputTextoCelula]}
              keyboardType='default'
              placeholder='Dia da Célula'
              value={dataCelula}
              onChangeText={(dataCelula) => setDataCelula(dataCelula)}
            />
            <TextInput
              style={[styles.inputTextoCelula]}
              keyboardType='default'
              placeholder='Horário da Célula'
              value={horarioCelula}
              onChangeText={(horarioCelula) => setHorarioCelula(horarioCelula)}
            />
            <TextInput
              style={[styles.inputTextoCelula]}
              keyboardType='default'
              placeholder='Endereço da Célula'
              value={enderecoCelula}
              onChangeText={(enderecoCelula) => setEnderecoCelula(enderecoCelula)}
            />
            <TextInput
              style={[styles.inputTextoCelula]}
              keyboardType='default'
              placeholder='Link do Endereço Maps'
              value={linkEnderecoMaps}
              onChangeText={(linkEnderecoMaps) => setLinkEnderecoMaps(linkEnderecoMaps)}
            />
            <TextInput
              style={[styles.inputTextoCelula]}
              keyboardType='default'
              placeholder='Nome do Líder'
              value={nomeLider}
              onChangeText={(nomeLider) => setNomeLider(nomeLider)}
            />
            <TextInput
              style={[styles.inputTextoCelula]}
              keyboardType='default'
              placeholder='Número do Líder'
              value={numeroLider}
              onChangeText={(numeroLider) => setNumeroLider(numeroLider)}
            />
            <TextInput
              style={[styles.inputTextoCelula]}
              keyboardType='default'
              placeholder='Descrição'
              value={descricao}
              onChangeText={(descricao) => setDescricao(descricao)}
            />

            <TouchableOpacity onPress={() => handleAddCelula()}>
              <View style={[styles.containerIconeAddCelula]}>
                <Text style={[styles.iconeAddCelula]}>+</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        )}
        <ConfirmarRemocao
          visivel={confirmacaoVisivel}
          onConfirmar={confirmarRemocao}
          onCancelar={cancelarRemocao}
        />
      </ScrollView>
      <InfoCelulaModal
        visible={modalVisible}
        celula={selectedCelula}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}