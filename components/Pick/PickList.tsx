import { ScrollView, View, Text, Button } from "react-native";
import orderModel from "../../models/orders";
import productModel from "../../models/products";
import { Typography, Base, Table } from "../../styles";
import { DataTable } from 'react-native-paper';

export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params; // se i OrderList funktionen listOfOrders och vid 'Onpress'

    // console.log(setProducts);

    // console.log(navigation);
    // console.log(order);
    // console.log(setProducts);

    let canPick = true;

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", {reload: true});
    }

    // const orderItemsList = order.order_items.map((item, index) => {
    //     if (item.amount > item.stock) {
    //         canPick = false;
    //     }
    //     return <Text key={index} style={Typography.normal}>
    //         {item.name}, antal: {item.amount} st, plats: {item.location}
    //     </Text>;
    // });

    const orderItemsTable = order.order_items
        .map((item, index) => {
            if (item.amount > item.stock) {
                canPick = false;
            }
            return (<DataTable.Row key={index}>
                <DataTable.Cell textStyle={Typography.normalCenter}>{item.name}</DataTable.Cell>
                <DataTable.Cell textStyle={Typography.normalCenter}>{item.amount}</DataTable.Cell>
                <DataTable.Cell textStyle={Typography.normalCenter}>{item.location}</DataTable.Cell>
            </DataTable.Row>)
        });

    return (
        <ScrollView style={Base.content}>
            <Text style={Typography.header2}>Order { order.id } att plocka</Text>
            <Text style={Typography.normal}>{order.name}</Text>
            <Text style={Typography.normal}>{order.address}</Text>
            <Text style={Typography.normal}>{order.zip} {order.city}</Text>

            {/* {orderItemsList} */}

            <DataTable style={Table.table}>
                <DataTable.Header>
                    <DataTable.Title>Produktnamn</DataTable.Title>
                    <DataTable.Title>Antal</DataTable.Title>
                    <DataTable.Title>Plats</DataTable.Title>
                </DataTable.Header>
                {orderItemsTable}
            </DataTable>

            {canPick ?
                <Button
                    color='#A85D14'
                    title="Plocka order"
                    onPress={pick}
                /> :
                <Text style={Typography.normal}>Otillräckligt i lagret!</Text>
            }
        </ScrollView>
    )

};