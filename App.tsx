import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import warehouse from './assets/warehouse.jpg';
import Stock from './components/Stock';
// import React from 'react';
// import './css/style.css';
// import './App.css';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.base}>
        <Text style={styles.title}>Lager-Appen</Text>
        <View style={styles.content}>
          <Image source={warehouse} style={styles.image} />
          <Stock />
          <StatusBar style="auto" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  base: {
    flex: 1,
    backgroundColor: '#eee',
  },
  title: {
    color: '#fff',
    backgroundColor: '#CB731D',
    fontSize: 42,
    fontFamily: "monospace",
    marginBottom: 20,
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 20,

  },
  image: {
    width: 320,
    height: 240,
    marginBottom: 10,
    alignSelf: "center",
  },
  content: {
    marginLeft: 40,
    marginRight: 40
  },

});