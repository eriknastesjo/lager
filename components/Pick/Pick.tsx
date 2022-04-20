import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrderList from './OrderList';
import PickList from './PickList';

const Stack = createNativeStackNavigator();

export default function Pick(props) {
    console.log(props);
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={OrderList} />
            {/* <Stack.Screen name="List">
                {(screenProps2) => <OrderList {...screenProps2} setProducts={props.setProducts} />}
            </Stack.Screen> */}

            {/* <Stack.Screen name="Details" component={PickList} /> */}
            <Stack.Screen name="Details">
                {(screenProps) => <PickList {...screenProps} setProducts={props.setProducts} />}
                {/* screenProps är godtyckligt namn på den props vi skickar in (namnet props var redan upptaget) */}
            </Stack.Screen>
        </Stack.Navigator>
    );
}