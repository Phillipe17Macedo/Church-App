import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  StatusBar,
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
const statusBarHeight = StatusBar.currentHeight;

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
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.category]}>
          <Text style={[styles.textCategory, { fontSize: windowWidth * 0.05 }]}>Esta Semana</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.containerEventos}>
            <TouchableOpacity onPress={handlePressEventos}>
              <Image style={styles.images} source={require('../../assets/img/imersao.png')} />
              <View style={styles.textContainer}>
                <Text style={[styles.textOne, { fontSize: windowWidth * 0.04 }]}>
                  IMERSÃO MARCADOS PELO ESPIRÍTO
                </Text>
                <Text style={[styles.textTwo, { fontSize: windowWidth * 0.035 }]}>
                  Data: 16 e 17 de Março
                </Text>
                <Text style={[styles.textThree, { fontSize: windowWidth * 0.035 }]}>
                  Valor: R$25,00
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.category}>
          <Text style={[styles.textCategory, { fontSize: windowWidth * 0.05 }]}>
            Eventos Final de Semana
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.containerEventos}>
            <TouchableOpacity onPress={handlePressEventos}>
              <Image style={styles.images} source={require('../../assets/img/cultoIgreja.png')} />
              <View style={styles.textContainer}>
                <Text style={[styles.textOne, { fontSize: windowWidth * 0.04 }]}>
                  CULTO DA FAMÍLIA
                </Text>
                <Text style={[styles.textTwo, { fontSize: windowWidth * 0.035 }]}>
                  Data: Aos Domingos
                </Text>
                <Text style={[styles.textThree, { fontSize: windowWidth * 0.035 }]}>
                  Horário: 18:00
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.containerEventos}>
            <TouchableOpacity onPress={handlePressEventos}>
              <Image
                style={styles.images}
                source={require('../../assets/img/RK/encontro-kids.png')}
              />
              <View style={styles.textContainer}>
                <Text style={[styles.textOne, { fontSize: windowWidth * 0.04 }]}>
                  CULTO RADICAIS KIDS
                </Text>
                <Text style={[styles.textTwo, { fontSize: windowWidth * 0.035 }]}>
                  Data: Aos Domingos
                </Text>
                <Text style={[styles.textThree, { fontSize: windowWidth * 0.035 }]}>
                  Horário: 18:00
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.containerEventos}>
            <TouchableOpacity onPress={handlePressCelulas}>
              <Image style={styles.images} source={require('../../assets/img/RL/Jesus.jpeg')} />
              <View style={styles.textContainer}>
                <Text style={[styles.textOne, { fontSize: windowWidth * 0.04 }]}>CÉLULAS</Text>
                <Text style={[styles.textTwo, { fontSize: windowWidth * 0.035 }]}>
                  Todas as Informações - Horários e Endereços
                </Text>
                <Text style={[styles.textThree, { fontSize: windowWidth * 0.035 }]}>
                  Valor: Grátis
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.containerEventos}>
            <TouchableOpacity onPress={handlePressEventos}>
              <Image style={styles.images} source={require('../../assets/img/RL/rl-united.jpg')} />
              <View style={styles.textContainer}>
                <Text style={[styles.textOne, { fontSize: windowWidth * 0.04 }]}>
                  REUNIÃO RADICAIS LIVRES
                </Text>
                <Text style={[styles.textTwo, { fontSize: windowWidth * 0.035 }]}>
                  Data: 16 de Março
                </Text>
                <Text style={[styles.textThree, { fontSize: windowWidth * 0.035 }]}>
                  Horário: 18:00
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.category}>
          <Text style={[styles.textCategory, { fontSize: windowWidth * 0.05 }]}>Próximo Mês</Text>
        </View>

        <View style={[styles.content, { marginBottom: 100 }]}>
          <View style={styles.containerEventos}>
            <TouchableOpacity onPress={handlePressEventos}>
              <Image style={styles.images} source={require('../../assets/img/encontro.png')} />
              <View style={styles.textContainer}>
                <Text style={[styles.textOne, { fontSize: windowWidth * 0.04 }]}>
                  ENCONTRO COM DEUS
                </Text>
                <Text style={[styles.textTwo, { fontSize: windowWidth * 0.035 }]}>
                  Data: 26 à 28 de Abril
                </Text>
                <Text style={[styles.textThree, { fontSize: windowWidth * 0.035 }]}>
                  Valor: R$50,00
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040316',
    paddingTop: Platform.OS === 'android' ? statusBarHeight : 25,
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
