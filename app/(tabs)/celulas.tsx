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
import { isAdmin } from '~/utils/Usuario/authAdmin';
import { buscarCelulaDoBanco } from '~/utils/Celula/buscar';
import { salvarCelulaNoBanco } from '~/utils/Celula/salvar';
import { removerCelulaDoBanco } from '~/utils/Celula/remover';

import ComponentCelulas from '~/components/ComponentCelulas/ComponentCelulas';

type RemoverCelulaButtonProps = {
  onPress: () => void;
}

const RemoverCelulaButton = ({onPress}: RemoverCelulaButtonProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.removerCelulaButton]}>
    <Text style={[styles.removerCelulaButtonText]}>Remover</Text>
  </TouchableOpacity>
);
type ConfirmacaoRemocaoPros = {
  visivel: boolean;
  onConfirmar: () => void;
  onCancelar: () => void;
};
const ConfirmarRemocao = ({visivel, onConfirmar, onCancelar}: ConfirmacaoRemocaoPros) => {
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

  const [nomeDaCelula, setNomeDaCelula] = useState('');
  const [diaDaCelula, setDiaDaCelula] = useState('');
  const [horarioDaCelula, setHorarioDaCelula] = useState('');
  const [enderecoDaCelula, setEnderecoDaCelula] = useState('');

  const handleAddCelula = async () => {
    try {
      let result = await launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [3, 2],
        quality: 1,
      });
      if(!result.canceled) {
        const imageUri = result.assets[0].uri;
        const imageName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
        const storage = getStorage();
        const storageReference = storageRef(storage, `celulas/${imageName}`);
        const imageBlob = await fetch(imageUri).then((response) => response.blob());
        await uploadBytes(storageReference, imageBlob);

        const downloadURL = await getDownloadURL(storageReference);
        const celulaId = await salvarCelulaNoBanco(nomeDaCelula, diaDaCelula, horarioDaCelula, enderecoDaCelula, downloadURL);
        const novaCelula = {
          id: celulaId,
          nomeCelula: nomeDaCelula,
          diaCelula: diaDaCelula,
          horarioCelula: horarioDaCelula,
          enderecoCelula: enderecoDaCelula,
          imageUri: downloadURL,
        };
        setCelulaItems([
          ...celulaItems,
          novaCelula,
        ]);
        setNomeDaCelula('');
        setDiaDaCelula('');
        setHorarioDaCelula('');
        setEnderecoDaCelula('');
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
      if(celulaIndexToRemove === -1){
        console.error('A Celula a ser removida não foi encontrada.');
        return;
      }
      const celulaToRemove = celulaItems[celulaIndexToRemove];

      const isAdminUser = await isAdmin();
      if(!isAdminUser){
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
    try{
      const celulasDoBanco = await buscarCelulaDoBanco();
    } catch (error) {
      console.error('Erro ao buscar Celulas:', error);
    } finally {
      setRefreshing(false);
    }
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
                  <TouchableOpacity key={index}>
                    <ComponentCelulas
                      nomeCelula={item.nomeDaCelula}
                      diaCelula={item.diaDaCelula}
                      horarioCelula={item.horarioDaCelula}
                      enderecoCelula={item.enderecoDaCelula}
                      imageUri={item.imagem}
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
              value={nomeDaCelula}
              onChangeText={(nomeDaCelula) => setNomeDaCelula(nomeDaCelula)}  
            />
            <TextInput
              style={[styles.inputTextoCelula]}
              keyboardType='default'
              placeholder='Dia da Célula'
              value={diaDaCelula}
              onChangeText={(diaDaCelula) => setDiaDaCelula(diaDaCelula)}
            />
            <TextInput
              style={[styles.inputTextoCelula]}
              keyboardType='default'
              placeholder='Horário da Célula'
              value={horarioDaCelula}
              onChangeText={(horarioDaCelula) => setHorarioDaCelula(horarioDaCelula)}
            />
            <TextInput
              style={[styles.inputTextoCelula]}
              keyboardType='default'
              placeholder='Endereço da Célula'
              value={enderecoDaCelula}
              onChangeText={(enderecoDaCelula) => setEnderecoDaCelula(enderecoDaCelula)}
            />
            <TouchableOpacity onPress={() => handleAddCelula}>
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
    </SafeAreaView>
  );
}