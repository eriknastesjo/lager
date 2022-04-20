import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import Order from '../../interfaces/order';
import orderModel from "../../models/orders";


export default function OrderDropDown(props) {
    // OBS kanske måste lyfta denna state???
    const [orders, setOrders] = useState<Order[]>([]);
    let productsHash: any = {};

    useEffect(async () => {
        setOrders(await orderModel.getOrders());
    }, []);

    const itemsList = orders
        .filter(order => order.status != "Fakturerad")
        .map((ord, index) => {
        productsHash[ord.id] = ord;
        return <Picker.Item key={index} label={ord.name + ' : ' + ord.id} value={ord.id} />;
    });

    return (
        <Picker
            selectedValue={props.invoices?.order_id}
            onValueChange={(itemValue) => {
                console.log(itemValue);
                props.setInvoices({ ...props.invoices, order_id: itemValue });
                props.setCurrentOrder(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}