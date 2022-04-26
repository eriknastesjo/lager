import { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import config from "../../config/config.json";
import { Typography, Table } from '../../styles/index';
import productModel from '../../models/products';
import { DataTable } from 'react-native-paper';

function StockList({ products, setProducts }) {
    // const [products, setProducts] = useState([]);
    // ligger istället i App.tsx för att bli åtkomlig för andra script!

    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);


    // const list = products.map((product, index) => <Text key={index} style={Typography.normal}> {product.name} : { product.id } ({product.stock} st)</Text>);

    const list = products
        .map((product, index) => {
            return (<DataTable.Row key={index}>
                <DataTable.Cell textStyle={Typography.normalCenter}>{product.name}</DataTable.Cell>
                <DataTable.Cell numeric textStyle={Typography.normalCenter}>{product.id}</DataTable.Cell>
                <DataTable.Cell numeric textStyle={Typography.normalCenter}>{product.stock}</DataTable.Cell>
            </DataTable.Row>)
        });

    return list;
}

export default function Stock({ products, setProducts }) {
    return (
        <ScrollView>
            <DataTable style={Table.table}>
                <DataTable.Header>
                    <DataTable.Title>Produktnamn</DataTable.Title>
                    <DataTable.Title numeric>Id</DataTable.Title>
                    <DataTable.Title numeric>Antal</DataTable.Title>
                </DataTable.Header>
                <StockList products={products} setProducts={setProducts} />
            </DataTable>
        </ScrollView>
    );
}
