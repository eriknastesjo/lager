import { ScrollView, View, Text, Button } from "react-native";
import orderModel from "../../models/orders";
import productModel from "../../models/products";
import { Typography, Base } from "../../styles";

export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params; // se i OrderList funktionen listOfOrders och vid 'Onpress'

    console.log(navigation);
    // console.log(order);
    // console.log(setProducts);

    let canPick = true;

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", {reload: true});
    }

    const orderItemsList = order.order_items.map((item, index) => {
        if (item.amount > item.stock) {
            canPick = false;
        }
        return <Text
            key={index}
        >
            {item.name}, antal: {item.amount} st, plats: {item.location}
        </Text>;
    });

    if (canPick) {
        return (
            <ScrollView style={Base.content}>
                <Text style={Typography.header2}>Order</Text>
                <Text>{order.name}</Text>
                <Text>{order.address}</Text>
                <Text>{order.zip} {order.city}</Text>

                <Text>Produkter:</Text>

                {orderItemsList}

                {/* {canPick === true &&
                    <Button
                        color='#A85D14'
                        title="Plocka order"
                        onPress={pick}
                    />
                } else ???*/}

                <Button
                    color="#4D4948"
                    title="Plocka order"
                    onPress={pick}
                />
            </ScrollView>
        )
    }
    return (
        <ScrollView>
            <Text>{order.name}</Text>
            <Text>{order.address}</Text>
            <Text>{order.zip} {order.city}</Text>

            <Text>Produkter:</Text>

            {orderItemsList}

            <Text>Otillräckligt i lagret!</Text>

        </ScrollView>
    )
};