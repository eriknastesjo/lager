import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import Order from '../../interfaces/order';
import orderModel from "../../models/orders";


export default function OrderDropDown(props) {
    // OBS kanske måste lyfta denna state???
    const [orders, setOrders] = useState<Order[]>([]);
    let productsHash: any = {};

    useEffect(async () => {
        setProducts(await orderModel.getOrders());
    }, []);

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue });
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}