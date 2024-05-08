/* eslint-disable prettier/prettier */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
} from 'react-native';

import { styles } from '../../style/StylesCelulas/styles';

interface Celula {
  imageSource: any;
  title: string;
  date: string;
  time: string;
  endereco: string;
  onPress: () => void;
}

export default function Celulas() {
  const windowWidth = useWindowDimensions().width;

  const openGoogleMaps = (endereco: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
    Linking.openURL(url);
  };
  const celulas: Celula[] = [
    {
      imageSource: require('../../assets/img/encontro.png'),
      title: 'CÉLULA TETELESTAI',
      date: '27 À 28 DE ABRIL',
      time: 'INTEGRAL',
      endereco: 'Av. Brasil, 531, Serra Negra, Patrocínio',
      onPress: () => openGoogleMaps('Av. Brasil, 531, Serra Negra, Patrocínio'),
    },
  ];
  const CategoriaItem = ({ title }: { title: string }) => (
    <View style={[styles.category]}>
      <Text style={[styles.textCategory, { fontSize: windowWidth * 0.06 }]}>{title}</Text>
    </View>
  );
  const CelulaItem = ({
    imageSource,
    title,
    date,
    time,
    endereco,
    onPress,
    ultimoItem = false,
  }: {
    imageSource: any;
    title: string;
    date: string;
    time: string;
    endereco: string;
    onPress: () => void;
    ultimoItem?: boolean;
  }) => {
    const marginBottom = ultimoItem ? 105 : 0;

    return (
      <View style={[styles.content, { marginBottom }, { marginTop: 20 }]}>
        <View style={styles.containerEventos}>
          <TouchableOpacity onPress={onPress}>
            <Image source={imageSource} style={styles.images} />
            <View style={styles.textContainer}>
              <Text style={[styles.textOne, { fontSize: windowWidth * 0.04 }]}>{title}</Text>
              <Text style={[styles.textTwo, { fontSize: windowWidth * 0.03 }]}>Data: {date}</Text>
              <Text style={[styles.textThree, { fontSize: windowWidth * 0.03 }]}>
                Horário: {time}
              </Text>
              <Text style={[styles.textThree, { fontSize: windowWidth * 0.03 }]}>
                Endereço: {endereco}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <ScrollView>
          <View style={[{backgroundColor: '#3E4A59',}, {alignItems: 'center'}, {marginTop: 25},{marginBottom: 20}, {width: '100%'}, {justifyContent: 'center'}, {alignSelf: 'center'}, {borderRadius: 10}]}>
            <Text style={[{fontSize: 21}, {paddingHorizontal: 2}, {paddingVertical: 3}, {color: '#fff'}, {textAlign: 'justify'}]}>
              ESTA TELA SERÁ LANÇADA EM BREVE COM SUAS FUNCIONALIDADES
            </Text>
          </View>
          <CategoriaItem title="Célula de Jovens" />
          <CelulaItem
            imageSource={require('../../assets/img/celulaAdonai.png')}
            title="CÉLULA ADONAI"
            date="Todos os Sábados"
            time="15:30"
            endereco="Rua Sostenes Santos Souza, 401, Patrocínio"
            onPress={() => openGoogleMaps('Rua Sostenes Santos Souza, 401, Patrocínio')}
          />

          <CelulaItem
            imageSource={require('../../assets/img/celulaRevived.png')}
            title="CÉLULA REVIVED"
            date="Todos os Sábados"
            time="19:30"
            endereco="Av Marciano Pires, 37, Patrocínio"
            onPress={() => openGoogleMaps('Av Marciano Pires, 37, Patrocínio')}
          />
          <CategoriaItem title="Célula de Adultos" />
          {celulas.length > 0 &&
            celulas.map((celula, index) => (
              <CelulaItem
                key={index}
                imageSource={celula.imageSource}
                title={celula.title}
                date={celula.date}
                time={celula.time}
                endereco={celula.endereco}
                onPress={celula.onPress}
                ultimoItem={index === celulas.length - 1}
              />
            ))}
        </ScrollView>
      </View>
    </>
  );
}