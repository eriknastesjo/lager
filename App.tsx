import { Ionicons } from '@expo/vector-icons';
import { Base, Header } from './styles/index';
import { StatusBar } from 'expo-status-bar';
import { Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './components/home/Home';
import Pick from './components/pick/Pick';
import Deliveries from './components/delivery/Deliveries';
import Auth from './components/auth/Auth';
import Logout from './components/auth/Logout';
import Invoices from './components/invoices/Invoices'
import Ship from './components/ship/Ship'
import authModel from './models/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';
import FlashMessage from "react-native-flash-message";

const Tab = createBottomTabNavigator();
// https://icons.expo.fyi/ sortera på ionicons eller importera bibliotek
const routeIcons = {
  "Lager": "cog",
  "Plock": "cart",
  "Inleverans": "gift-sharp",
  "Logga in": "log-in",
  "Logga ut": "log-out",
  "Faktura": "card",
  "Leveranser": "airplane",
};

export default function App() {

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
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
        <Tab.Screen name="Inleverans">
          {() => <Deliveries setProducts={setProducts} />}
        </Tab.Screen>
        <Tab.Screen name="Plock">
          {() => <Pick
            products={products} setProducts={setProducts}
            orders={orders} setOrders={setOrders} />}
        </Tab.Screen>
        {/* <Tab.Screen name="Leveranser" component={Ship} /> */}
        <Tab.Screen name="Leveranser">
          {() => <Ship orders={orders} setOrders={setOrders} />}
        </Tab.Screen>
        {isLoggedIn ?
          <Tab.Screen name="Faktura">
            {() => <Invoices orders={orders} setOrders={setOrders} />}
          </Tab.Screen>
          :
          <Tab.Screen name="Logga in">
            {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen>
          // debug nedan för att kunna testa login
          // <Tab.Screen name="Logga in">
          //   {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
          // </Tab.Screen> :
          // <Tab.Screen name="Faktura" component={Invoices} />
        }
        {
          isLoggedIn &&
          <Tab.Screen name="Logga ut">
              {() => <Logout setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen>
        }
      </Tab.Navigator>
    </NavigationContainer>
    <StatusBar style="auto" />
    <FlashMessage position="top" />
  </SafeAreaView>
);
}

