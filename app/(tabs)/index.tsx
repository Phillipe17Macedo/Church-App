/* eslint-disable prettier/prettier */
import { launchImageLibraryAsync } from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
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
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { isAdmin } from '~/utils/Usuario/authAdmin';
import { salvarEventoNoBanco, removerEventoDoBanco, buscarEventosDoBanco, } from '~/utils/Evento/firebaseEvento';
import ComponentEventos from '../../components/ComponentEventos/ComponentEventos';

const RemoverEventoButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.removerEventoButton}>
    <Text style={styles.removerEventoButtonText}>Remover</Text>
  </TouchableOpacity>
);

const ConfirmacaoRemocao = ({ visivel, onConfirmar, onCancelar }) => {
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
    // Verifica se o usuário é administrador ao carregar a tela
    const checkAdminStatus = async () => {
      const isAdminResult = await isAdmin();
      setIsAdminUser(isAdminResult);
    };
    checkAdminStatus();

    // Busca os eventos do banco de dados ao carregar a tela
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
  }
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <StatusBar style="light" />
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

          {isAdminUser &&(
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040316',
    paddingBottom: 100,
  },
  areaEventos:{
    paddingHorizontal: 25,
  },
  areaContainerEvento: {
    marginTop: 10,
  },
  containerInputNewEvento:{
    flex: 1,
    position: 'relative',
    marginTop: 10,
    width: '85%',
    height: 'auto',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputTextoEvento: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: '100%',
    height: 40,
    marginBottom: 5,
  },
  containerIconeAddEvento: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginBottom: 5,
  },
  iconeAddEvento: {
    fontSize: 30,
    fontWeight: 'normal',
    paddingBottom: 3,
    color: 'gray',
  },
  removerEventoButton: {
    position: 'absolute',
    top: 22,
    right: 8,
    backgroundColor: '#3E4A59',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#B8D9D3',
    shadowOffset:{width:5,height:5},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,  
  },
  removerEventoButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    minWidth: '40%',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#2196F3',
  },
  cancelButton: {
    backgroundColor: '#FF5733',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});