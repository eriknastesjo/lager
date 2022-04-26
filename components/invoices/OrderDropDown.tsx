import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import Order from '../../interfaces/order';
import orderModel from "../../models/orders";


export default function OrderDropDown(props) {
    let odersHash: any = {};
    let isFirstItem = true;
    let firstOrdId = null;

    useEffect(async () => {
        console.log("GETTING ORDERS!!!!!!!!!!!!");
        props.setOrders(await orderModel.getOrders());
    }, []);

    const itemsList = props.orders
        .filter(order => order.status != "Fakturerad")
        .map((ord, index) => {
            if (isFirstItem) {
                isFirstItem = false;
                firstOrdId = ord.id;
            }
        odersHash[ord.id] = ord;
        return <Picker.Item key={index} label={ord.name + ' : ' + ord.id} value={ord.id} />;
        });

    // console.log("ITEMLIIIIIST");
    // console.log(itemsList);

    // console.log("FIIRSTORDERID");
    // console.log(firstOrdId);

    useEffect(async () => {
        console.log("SETTING FIRST");
        props.setCurrentOrder(odersHash[firstOrdId]);
        props.setInvoices({ ...props.invoices, order_id: firstOrdId });
    }, []);

    return (
        <Picker
            selectedValue={props.invoices?.order_id}
            onValueChange={(itemValue) => {
                console.log("CHANGING VALUE");
                props.setInvoices({ ...props.invoices, order_id: itemValue });
                props.setCurrentOrder(odersHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}