import { Ionicons } from '@expo/vector-icons';
import { Base, Header } from './styles/index';
import { StatusBar } from 'expo-status-bar';
import { Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './components/home/Home';
import Pick from './components/pick/Pick';
import Deliveries from './components/delivery/Deliveries';
import Auth from './components/auth/Auth';
import Invoices from './components/invoices/Invoices'
import authModel from './models/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';


const Tab = createBottomTabNavigator();
// https://icons.expo.fyi/ sortera på ionicons eller importera bibliotek
const routeIcons = {
  "Lager": "cog",
  "Plock": "cart",
  "Inleverans": "gift-sharp",
  "Logga in": "log-in",
  "Faktura": "card"
};

export default function App() {

  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(async () => {
    setIsLoggedIn(await authModel.loggedIn());
  }, []);

return (
  <SafeAreaView style={Base.container}>
    <Text style={Header.title}>Lager-Apan</Text>

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
        {isLoggedIn ?
          <Tab.Screen name="Faktura" component={Invoices} /> :
          <Tab.Screen name="Logga in">
            {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen>

          // debug nedan för att kunna testa login
          // <Tab.Screen name="Logga in">
          //   {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
          // </Tab.Screen> :
          // <Tab.Screen name="Faktura" component={Invoices} />
        }
      </Tab.Navigator>
    </NavigationContainer>
    <StatusBar style="auto" />
  </SafeAreaView>
);
}

