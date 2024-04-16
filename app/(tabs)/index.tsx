import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
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
  const handlePressEventos = () => {
    navigation.navigate('eventos');
  };
  const handlePressCelulas = () => {
    navigation.navigate('celulas');
  };
  const eventos: Evento[] = [
    {
      imageSource: require('../../assets/img/encontro.png'),
      title: 'ENCONTRO COM DEUS',
      date: '27 À 28 DE ABRIL',
      time: 'INTEGRAL',
      onPress: handlePressEventos,
    },
  ];
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

        <CategoriaItem title="Próximo Mês" />

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
});
