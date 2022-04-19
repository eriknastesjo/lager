import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Login';
import Register from './Register';
import Choice from './LoginMenu';

const Stack = createNativeStackNavigator();

export default function Deliveries(props) {

    return (
        <Stack.Navigator initialRouteName="LoginMenu">
            <Stack.Screen name="LoginMenu">
                {(screenProps) => <Choice {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Login">
                {(screenProps) => <Login {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    );
};