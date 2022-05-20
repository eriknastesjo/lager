import { useState } from 'react';
import { View, ScrollView, Text, TextInput, Button } from "react-native";
import { Base, Typography, Forms } from '../../styles';
import OrderDropDown from './OrderDropDown';

import Invoice from '../../interfaces/invoice';
import Order from '../../interfaces/order';
import invoiceModel from "../../models/invoice";
import orderModel from "../../models/orders";
import storageModel from '../../models/storage';

async function addInvoice(navigation, invoice, currentOrder, setOrders) {
    let totalPrice = 0;

    // console.log("CUUUURREEEEEENT");
    // console.log(currentOrder);
    // console.log("INVOOOOIIIIICE");
    // console.log(invoice);

    currentOrder.order_items.map((order_item, index) => {
        totalPrice += order_item.price * order_item.amount;
    });

    // console.log(navigation);

    invoice['total_price'] = totalPrice;

    await invoiceModel.setInvoice(await storageModel.readToken(), invoice);
    setOrders(await orderModel.getOrders());
    navigation.navigate("List", { reload: true });
}

export default function InvoiceForm({ navigation, orders, setOrders }) {
    const [invoices, setInvoices] = useState<Partial<Invoice>>({});
    const [currentOrder, setCurrentOrder] = useState<Order[]>([]);

    // console.log("CURRENT ORDER");
    // console.log(currentOrder);
    // console.log("CURRENT INVOICES");
    // console.log(invoices);

    return (
        <ScrollView style={Base.content}>
            <Text style={Typography.header2}>Ny faktura</Text>

            <Text style={{ ...Typography.label }}>Order</Text>
            <OrderDropDown
                invoices={invoices}
                setInvoices={setInvoices}
                setCurrentOrder={setCurrentOrder}
                required="required"
                orders={orders}
                setOrders={setOrders}
            />

            <Button
                title="Skapa faktura"
                color="#4D4948"
                onPress={() => {
                    addInvoice(navigation, invoices, currentOrder, setOrders);
                }}
            />

        </ScrollView>
    );

};