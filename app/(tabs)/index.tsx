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

export default function Home() {
  const navigation = useNavigation<any>();
  const windowWidth = useWindowDimensions().width;
  const handlePressEventos = () => {
    navigation.navigate('eventos');
  };
  const handlePressCelulas = () => {
    navigation.navigate('celulas');
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
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
