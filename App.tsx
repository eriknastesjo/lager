import { Ionicons } from '@expo/vector-icons';
import { Base, Header } from './styles/index';
import { StatusBar } from 'expo-status-bar';
import { Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import warehouse from './assets/warehouse.jpg';
import Home from './components/Home/Home';
import Pick from './components/Pick/Pick';
import Deliveries from './components/Delivery/Deliveries';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';


const Tab = createBottomTabNavigator();
// https://icons.expo.fyi/ sortera på ionicons eller importera bibliotek
const routeIcons = {
  "Lager": "cog",
  "Plock": "cart",
  "Inleverans": "gift-sharp"
};

export default function App() {

  const [products, setProducts] = useState([]);

return (
  <SafeAreaView style={Base.container}>
    <Text style={Header.title}>Lager-Apan</Text>
    <Image source={warehouse} style={Header.image}/>
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = routeIcons[route.name] || "alert";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#CB731D',
        tabBarInactiveTintColor: 'gray',
      })}
      >
        <Tab.Screen name="Lager">
          {() => <Home products={products} setProducts={setProducts} />}
        </Tab.Screen>
        <Tab.Screen name="Plock">
          {() => <Pick products={products} setProducts={setProducts} />}
        </Tab.Screen>
        <Tab.Screen name="Inleverans">
          {() => <Deliveries setProducts={setProducts} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
    <StatusBar style="auto" />
  </SafeAreaView>
);
}

