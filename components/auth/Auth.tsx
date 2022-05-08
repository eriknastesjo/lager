import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native-paper';

import Login from './Login';
import Register from './Register';
import Choice from './LoginMenu';
import { getStateFromPath } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function Deliveries(props) {

    // console.log(props);
    // console.log(props.setIsLoggedIn);
    return (
        <Stack.Navigator initialRouteName="LoginMenu">
            <Stack.Screen name="LoginMenu" component={Choice}/>
            <Stack.Screen name="Login">
                {(screenProps) => <Login {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    );
};