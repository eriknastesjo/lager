import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InvoiceList from './InvoiceList';
import InvoiceForm from './InvoiceForm';

const Stack = createNativeStackNavigator();

export default function Pick(props) {
    // console.log(props);
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={InvoiceList} />
            <Stack.Screen name="Form">
                {(screenProps) => <InvoiceForm {...screenProps} setProducts={props.setProducts} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}