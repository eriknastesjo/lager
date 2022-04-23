import { useState, useEffect } from 'react';
import { Base, Typography, Header } from '../../styles/index';
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';
import config from "../../config/config.json";
import Stock from './Stock';
import warehouse from '../../assets/warehouse.jpg';



export default function Home({ products, setProducts }) {
    return (
        <ScrollView >
            <Image source={warehouse} style={Header.image} />
            <Text style={Typography.header1}>Lagerförteckning</Text>
            <View style={Base.content}>
                <Stock products={products} setProducts={setProducts} />
            </View>
        </ScrollView>
    );
}
