import { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import config from "../../config/config.json";
import { Typography } from '../../styles/index';
import productModel from '../../models/products';

function StockList({ products, setProducts }) {
    // const [products, setProducts] = useState([]);
    // ligger istället i App.tsx för att bli åtkomlig för andra script!

    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

    // console.log(products);

    const list = products.map((product, index) => <Text key={index} style={Typography.normal}> {product.name} : { product.id } ({product.stock} st)</Text>);

    // console.log(list);  // ser konstigt ut men det blir en array full av Text-komponenter med key och props

    return list;
}

export default function Stock({ products, setProducts }) {
    return (
        <ScrollView>
            <StockList products={products} setProducts={setProducts} />
        </ScrollView>
    );
}
