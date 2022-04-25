import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShipList from './ShipList';
import ShipOrder from './ShipOrder';

const Stack = createNativeStackNavigator();

export default function Ship(props) {
    // console.log(props);
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={ShipList} />
            {/* <Stack.Screen name="List">
                {(screenProps2) => <OrderList {...screenProps2} setProducts={props.setProducts} />}
            </Stack.Screen> */}

            <Stack.Screen name="Details" component={ShipOrder} />
            {/* <Stack.Screen name="Details"> */}
                {/* {(screenProps) => <ShipOrder {...screenProps} setProducts={props.setProducts} />} */}
                {/* screenProps är godtyckligt namn på den props vi skickar in (namnet props var redan upptaget) */}
            {/* </Stack.Screen> */}
        </Stack.Navigator>
    );
}
