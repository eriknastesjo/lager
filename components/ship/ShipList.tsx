import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import config from "../../config/config.json";
import orderModel from '../../models/orders';
import { Typography } from '../../styles';

export default function OrderList({ navigation, route }) {

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

    console.log(allOrders);

    const listOfOrders = allOrders
        .filter(order => order.status !== "Ny") // kanske ändra till att måste ha just status "Plockad"?
        .map((order, index) => {
            return <Button
                color='#A85D14'
                title={order.name + " : " + order.id}
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
            <Text style={Typography.header1}>Ordrar redo att skickas</Text>
            {listOfOrders}
        </View>
    );
}
