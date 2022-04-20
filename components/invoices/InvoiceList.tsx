import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import config from "../../config/config.json";
import invoiceModel from '../../models/invoice';
import storageModel from '../../models/storage';
import { Typography } from '../../styles';

export default function InvoiceList({ route, navigation, setProducts }) {

    const [allInvoices, setInvoices] = useState([]);

    const { reload } = route.params || true;

    if (reload) {
        reloadInvoices();
    }

    useEffect(async () => {
        reloadInvoices();
    }, []);

    async function getToken() {
        return await storageModel.readToken();
    }

    async function reloadInvoices() {
        setInvoices(await invoiceModel.getInvoices(await getToken()));
    }

    // console.log(allInvoices);

    // fyll på med mer text sen i en tabell!!!
    const listOfInvoices = allInvoices
        .map((invoice, index) => {
            return <Text key={index} style={Typography.normal}> {invoice.name}</Text>
        });

    return (
        <View>
            {listOfInvoices}
            <Button
                color="#4D4948"
                title="Ny faktura"
                onPress={() => {
                    navigation.navigate('Form', setInvoices);
                }}
            />
        </View>
    );
}
