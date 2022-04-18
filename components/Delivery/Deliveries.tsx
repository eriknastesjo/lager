import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native';

import DeliveriesList from './DeliveriesList';
import DeliveryForm from './DeliveryForm';

const Stack = createNativeStackNavigator();

export default function Deliveries(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="Details">
                {(screenProps) => <DeliveryForm {...screenProps} setProducts={props.setProducts} />}
                {/* screenProps är godtyckligt namn på den props vi skickar in (namnet props var redan upptaget) */}
            </Stack.Screen>
            <Stack.Screen name="List" component={DeliveriesList} />
            <Stack.Screen name="Form" component={DeliveryForm} />
        </Stack.Navigator>
    );
};