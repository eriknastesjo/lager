import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import config from "../../config/config.json";
import orderModel from '../../models/orders';

export default function OrderList({ route, navigation }) {

    // console.log(route);

    const { reload } = route.params || true;

    if (reload) {
        reloadOrders();
        console.log("reload!");
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    const [allOrders, setAllOrders] = useState([]);

    useEffect(async () => {
        reloadOrders();
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <Button
                color="#4D4948"
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        order: order
                    });
                }}
            />
        });

    return (
        <View>
            {listOfOrders}
        </View>
    );
}
