import { useState, useEffect } from 'react';
import { Base, Typography } from '../../styles/index';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import config from "../../config/config.json";
import Stock from './Stock';


export default function Home({ products, setProducts }) {
    return (
        <ScrollView >
            <Text style={Typography.header1}>Lagerförteckning</Text>
            <View style={Base.content}>
                <Stock products={products} setProducts={setProducts} />
            </View>
        </ScrollView>
    );
}
