// del av components/DeliveriesList.tsx
import { useState, useEffect } from 'react';
import { Button, Text, View, ScrollView} from 'react-native';
import { Base, Typography, Table } from '../../styles/index';
import deliveryModel from '../../models/deliveries';
import { DataTable } from 'react-native-paper';

export default function Deliveries({ route, navigation }) {

    const [allDeliveries, setDeliveries] = useState([]);

    let { reload } = route.params || true;

    if (reload) {
        // console.log("reload");
        reloadDeliveries();
        route.params = false;
    }

    async function reloadDeliveries() {
        setDeliveries(await deliveryModel.getDeliveries());
    }

    useEffect(async () => {
        reloadDeliveries();
    }, []);

    // const list = allDeliveries.map((delivery, index) => <Text key={index} style={Typography.normal}> {delivery.product_name
    // } (antal: {delivery.amount} st, levererad: {delivery.delivery_date}, kommentar: {delivery.comment})</Text>);

    const list = allDeliveries
        .map((delivery, index) => {
            return (<View key = { index }>
                <DataTable.Row>
                    <DataTable.Cell textStyle={Typography.boldCenter}> Leverans id { delivery.id }</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell textStyle={Typography.normalCenter}>{delivery.product_name}</DataTable.Cell>
                    <DataTable.Cell textStyle={Typography.normalCenter}>{delivery.product_id}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell textStyle={Typography.normalCenter}>Antal</DataTable.Cell>
                    <DataTable.Cell textStyle={Typography.normalCenter}>{delivery.amount}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell textStyle={Typography.normalCenter}>Leveransdatum</DataTable.Cell>
                    <DataTable.Cell textStyle={Typography.normalCenter}>{delivery.delivery_date}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell textStyle={Typography.normalCenter}>Kommentar</DataTable.Cell>
                    <DataTable.Cell textStyle={Typography.normalCenter}>{delivery.comment}</DataTable.Cell>
                </DataTable.Row>

            </View>)
        });



    return (
        <View>

            <ScrollView>
                <Text style={Typography.header1}>Inleveranser</Text>

                <Button
                    title="Ny inleverans"
                    color='#A85D14'
                    onPress={() => {
                        navigation.navigate('Form');
                    }}
                />

                {list.length !== 0 ?
                    <DataTable style={Table.table}>
                        { list }
                    </DataTable>
                    :
                    <Text style={Typography.normal}>Inga inleveranser registrerade.</Text>
                }

            </ScrollView>

        </View>
    );

};

