import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
} from 'react-native';

export default function Celulas() {
  const windowWidth = useWindowDimensions().width;

  const openGoogleMaps = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url);
  };

  const CelulaItem = ({
    imageSource,
    title,
    date,
    time,
    onPress,
  }: {
    imageSource: any;
    title: string;
    date: string;
    time: string;
    onPress: () => void;
  }) => (
    <View style={[styles.content, { marginTop: 20 }]}>
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

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <CelulaItem
            imageSource={require('../../assets/img/celulaAdonai.png')}
            title="CÉLULA ADONAI"
            date="Todos os Sábados"
            time="15:30"
            onPress={() => openGoogleMaps(-18.927672, -46.970893)}
          />

          <CelulaItem
            imageSource={require('../../assets/img/celulaRevived.png')}
            title="CÉLULA REVIVED"
            date="Todos os Sábados"
            time="19:30"
            onPress={() => openGoogleMaps(-18.961282, -46.987652)}
          />
        </ScrollView>
      </View>
    </>
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
    width: '100%',
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
});
