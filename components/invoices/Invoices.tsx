import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InvoiceList from './InvoiceList';
import InvoiceForm from './InvoiceForm';

const Stack = createNativeStackNavigator();

export default function Invoice(props) {
    // console.log(props);
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={InvoiceList} />
            {/* <Stack.Screen name="Form" component={InvoiceForm} /> */}
            <Stack.Screen name="Form">
                {(screenProps) => <InvoiceForm {...screenProps} orders={props.orders} setOrders={props.setOrders} />}
                {/* screenProps är godtyckligt namn på den props vi skickar in (namnet props var redan upptaget) */}
            </Stack.Screen>
        </Stack.Navigator>
    );
}