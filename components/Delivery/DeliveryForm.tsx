import { useState } from 'react';
import { View, ScrollView, Text, TextInput, Button } from "react-native";
import { Base, Typography, Forms } from '../../styles';
import ProductDropDown from './ProductDropDown';
import DateDropDown from './DateDropDown';

import Delivery from '../../interfaces/delivery';
import Product from '../../interfaces/product';
import productModel from "../../models/products";
import deliveryModel from "../../models/deliveries";

async function addDelivery(navigation, delivery, setProducts) {
    await deliveryModel.setDelivery(delivery);
    setProducts(await productModel.getProducts());
    navigation.navigate("List", { reload: true });
}

export default function DeliveryForm({ navigation, setProducts }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Product[]>([]);

    // console.log(navigation);

    return (
        <ScrollView style={Base.content }>
        <Text style={Typography.header2}>Ny inleverans</Text>

            <Text style={{ ...Typography.label }}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
                required="required"
            />

            <Text style={Typography.label }>Antal</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    content = content ? content : '0';
                    setDelivery({ ...delivery, amount: parseInt(content) })
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />

            <Text style={{ ...Typography.label }}>Leveransdatum</Text>
            <Text style={{ ...Typography.label }}>{delivery.delivery_date}</Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                required="required"
            />

            <Text style={Typography.label}>Kommentar</Text>
            <TextInput
                style={Forms.input }
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
                />
            <Button
                title="Gör inleverans"
                color='#A85D14'
                onPress={() => {
                    addDelivery(navigation, delivery, setProducts);
                }}
            />

        </ScrollView>
    );


};