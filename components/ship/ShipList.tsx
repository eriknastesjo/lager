import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import config from "../../config/config.json";
import orderModel from '../../models/orders';
import { Typography } from '../../styles';

export default function OrderList({ navigation, route, orders, setOrders }) {

    // console.log(route);

    // const [allOrders, setAllOrders] = useState([]);
    const { reload } = route.params || true;

    if (reload) {
        reloadOrders();
        console.log("reload!");
    }

    async function reloadOrders() {
        setOrders(await orderModel.getOrders());
    }


    useEffect(async () => {
        reloadOrders();
    }, []);

    console.log(orders);

    const listOfOrders = orders
        .filter(order => order.status === "Packad") // kanske ändra till att måste ha just status "Plockad"?
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
            {listOfOrders.length > 0 ?
                listOfOrders :
                <Text style={Typography.normal}>Inga ordrar är redo att skickas.</Text>
            }
        </View>
    );
}
