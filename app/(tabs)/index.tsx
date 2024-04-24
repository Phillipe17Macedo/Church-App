/* eslint-disable prettier/prettier */
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import { buscarEventosDoBanco, editarEventoNoBanco, isAdmin } from '../../utils/firebase';

interface Evento {
  imageSource: any;
  title: string;
  date: string;
  time: string;
  onPress: () => void;
}
export default function Home() {
  const navigation = useNavigation<any>();
  const windowWidth = useWindowDimensions().width;
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    async function checkAdminStatus() {
      const isAdmin = await verificarAdmin();
      setIsAdminUser(isAdmin);

      const eventosFromDB = await buscarEventosDoBanco();
      setEventos(eventosFromDB);
    }
    checkAdminStatus();
  }, []);

  const handlePressEventos = () => {
    navigation.navigate('eventos');
  };
  const handlePressCelulas = () => {
    navigation.navigate('celulas');
  };
  const handleAddEvent = () => {
    // Aqui você pode abrir um modal ou navegar para uma nova tela para adicionar um novo evento
    // Por enquanto, vamos apenas logar uma mensagem
    console.log('Botão de adicionar evento clicado!');
  };
  const handleEditEvent = async (eventoId: string) => {
    // Aqui você pode implementar a lógica para editar o evento
    // Por enquanto, vamos apenas mostrar uma mensagem de log
    console.log('Evento editado:', eventoId);
  };

  const CategoriaItem = ({ title }: { title: string }) => (
    <View style={[styles.category]}>
      <Text style={[styles.textCategory, { fontSize: windowWidth * 0.06 }]}>{title}</Text>
    </View>
  );
  
  const EventosItem = ({
    imageSource,
    title,
    date,
    time,
    onPress,
    ultimoItem = false,
  }: {
    imageSource: any;
    title: string;
    date: string;
    time: string;
    onPress: () => void;
    ultimoItem?: boolean;
  }) => {
  const marginBottom = ultimoItem ? 100 : 20;
  const isAdminUser = isAdmin();

    return (
      <View style={[styles.content, { marginBottom }]}>
        <View style={styles.containerEventos}>
          <TouchableOpacity onPress={onPress}>
            <Image source={imageSource} style={styles.images} />
            <View style={styles.textContainer}>
              <Text style={[styles.textOne, { fontSize: windowWidth * 0.04 }]}>{title}</Text>
              <Text style={[styles.textTwo, { fontSize: windowWidth * 0.035 }]}>Data: {date}</Text>
              <Text style={[styles.textThree, { fontSize: windowWidth * 0.035 }]}>
                Horário: {time}
              </Text>
            </View>
          </TouchableOpacity>
          {isAdminUser && (
            <TouchableOpacity onPress={() => handleEditEvent(id)} style={styles.editButton}>
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView>
        <CategoriaItem title="Esta Semana" />

        <EventosItem
          imageSource={require('../../assets/img/imersao.png')}
          title="IMERSÃO MARCADOS PELO ESPIRÍTO"
          date="27/04/2024"
          time="19h - 22h"
          onPress={handlePressEventos}
        />
        <TouchableOpacity style={styles.addButtonContainer} onPress={handleAddEvent}>
          <TouchableOpacity >
            <Ionicons name="add-circle-outline" size={48} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>

        <CategoriaItem title="Este Final de Semana" />

        <EventosItem
          imageSource={require('../../assets/img/cultoIgreja.png')}
          title="CULTO DA FAMÍLIA"
          date="21/04/2024"
          time="18h - 20h"
          onPress={handlePressEventos}
        />
        <EventosItem
          imageSource={require('../../assets/img/RK/encontro-kids.png')}
          title="CULTO RADICAIS KIDS"
          date="21/04/2024"
          time="18h - 20h"
          onPress={handlePressEventos}
        />
        <EventosItem
          imageSource={require('../../assets/img/RL/Jesus.jpeg')}
          title="NOSSAS CÉLULAS"
          date="TODA SEMANA"
          time="18h - 20h"
          onPress={handlePressCelulas}
        />
        <EventosItem
          imageSource={require('../../assets/img/RL/rl-united.jpg')}
          title="CULTOS E REUNIÕES RADICAIS LUVRES"
          date="TODO SÁBADO"
          time="15h - 21h"
          onPress={handlePressEventos}
        />
        <TouchableOpacity style={styles.addButtonContainer} onPress={handleAddEvent}>
          <TouchableOpacity >
            <Ionicons name="add-circle-outline" size={48} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>

        <CategoriaItem title="Próximo Mês" />
        <EventosItem
          imageSource={require('../../assets/img/encontro.png')}
          title='ENCONTRO COM DEUS'
          date='27 À 28 DE ABRIL'
          time='INTEGRAL'
          onPress={handlePressEventos}
        />

        <TouchableOpacity style={styles.addButtonContainer} onPress={handleAddEvent}>
          <TouchableOpacity >
            <Ionicons name="add-circle-outline" size={48} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>

        {eventos.map((evento, index) => (
          <EventosItem
            key={index}
            imageSource={evento.imageSource}
            title={evento.title}
            date={evento.date}
            time={evento.time}
            onPress={evento.onPress}
            ultimoItem={index === eventos.length - 1}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040316',
  },
  content: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '85%',
    height: 200,
    marginBottom: 20,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    overflow: 'hidden',
  },
  containerEventos: {
    position: 'relative',
    width: '100%',
    height: '65.08%',
    textAlign: 'center',
    bottom: 35,
  },
  images: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    position: 'absolute',
    top: 130,
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#3E4A59',
    paddingTop: 10,
    paddingLeft: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textOne: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textTwo: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 14,
  },
  textThree: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 14,
  },
  category: {
    marginBottom: 20,
    width: '85%',
    height: 'auto',
    alignSelf: 'center',
  },
  textCategory: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 21,
  },
    editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#3E4A59',
    padding: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButtonContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '85%',
    padding:3,
    borderRadius: 10,
    backgroundColor: 'gray',
  },
});