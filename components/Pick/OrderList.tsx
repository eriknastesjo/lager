import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import config from "../../config/config.json";
import orderModel from '../../models/orders';
import { Typography } from '../../styles';

export default function OrderList({ route, navigation, orders, setOrders }) {

    const { reload } = route.params || true;

    if (reload) {
        reloadOrders();
        route.params = false;
    }

    useEffect(async () => {
        reloadOrders();
    }, []);

    async function reloadOrders() {
        setOrders(await orderModel.getOrders());
    }

    const listOfOrders = orders
        .filter(order => order.status === "Ny")
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
            <Text style={Typography.header1}>Ordrar</Text>
            {listOfOrders.length > 0 ?
                listOfOrders :
                <Text>Inga ordrar är redo att plockas.</Text>
            }
        </View>
    );
}
