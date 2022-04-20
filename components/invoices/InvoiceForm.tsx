import { useState } from 'react';
import { View, ScrollView, Text, TextInput, Button } from "react-native";
import { Base, Typography, Forms } from '../../styles';
import OrderDropDown from './OrderDropDown';

import Invoice from '../../interfaces/invoice';
import Order from '../../interfaces/order';
import invoiceModel from "../../models/invoice";
import orderModel from "../../models/orders";
import storageModel from '../../models/storage';

async function addInvoice(navigation, invoice, currentOrder) {
    let totalPrice = 0;
    currentOrder.order_items.map((order_item, index) => {
        totalPrice += order_item.price * order_item.amount;
    });

    invoice['total_price'] = totalPrice;

    navigation.navigate("List", { reload: true });
    await invoiceModel.setInvoice(await storageModel.readToken(), invoice);  // todo: lägg in setinvoice i invoiceModel
    // setOrders(await orderModel.getOrders());     // todo: har inte skapat order state och skickat vidare från App.tsx än
}

export default function InvoiceForm({ navigation }) {
    const [invoices, setInvoices] = useState<Partial<Invoice>>({});    // todo: fixa setInvoices från props istället!
    const [currentOrder, setCurrentOrder] = useState<Order[]>([]);

    return (
        <ScrollView style={Base.content}>
            <Text style={Typography.header2}>Ny faktura</Text>

            <Text style={{ ...Typography.label }}>Order</Text>
            <OrderDropDown
                invoices={invoices}
                setInvoices={setInvoices}
                setCurrentOrder={setCurrentOrder}
                required="required"
            />

            <Button
                title="Skapa faktura"
                color="#4D4948"
                onPress={() => {
                    addInvoice(navigation, invoices, currentOrder);
                }}
            />

        </ScrollView>
    );

};