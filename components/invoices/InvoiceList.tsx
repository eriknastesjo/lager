import { useState, useEffect } from 'react';
import { View, ScrollView, Text, Button } from "react-native";
import config from "../../config/config.json";
import invoiceModel from '../../models/invoice';
import storageModel from '../../models/storage';
import { Base, Table, Typography } from '../../styles';
import { DataTable } from 'react-native-paper';


export default function InvoiceList({ route, navigation, setProducts }) {

    const [allInvoices, setInvoices] = useState([]);

    const { reload } = route.params || true;

    async function getToken() {
        return await storageModel.readToken();
    }

    if (reload) {
        reloadInvoices();
    }

    useEffect(async () => {
        reloadInvoices();
    }, []);

    async function reloadInvoices() {
        setInvoices(await invoiceModel.getInvoices(await getToken()));
    }

    const table = allInvoices
        .map((invoice, index) => {
            return (<DataTable.Row key={index}>
                <DataTable.Cell>{invoice.name}</DataTable.Cell>
                <DataTable.Cell numeric>{invoice.order_id}</DataTable.Cell>
                <DataTable.Cell numeric>{invoice.total_price} :-</DataTable.Cell>
            </DataTable.Row>)
        });

    return (
        <ScrollView>
            <Text style={Typography.header1}>Fakturor</Text>
            <DataTable style={Table.table}>
                <DataTable.Header>
                    <DataTable.Title>Namn</DataTable.Title>
                    <DataTable.Title numeric>Ordernummer</DataTable.Title>
                    <DataTable.Title numeric>Totalpris</DataTable.Title>
                </DataTable.Header>
                {table}
            </DataTable>
            <Button
                color='#A85D14'
                title="Ny faktura"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </ScrollView>
    );
}
