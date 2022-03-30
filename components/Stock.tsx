import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import config from "../config/config.json";

function StockList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setProducts(result.data));
    }, []);

    // console.log(products);

    const list = products.map((product, index) => <Text key={index} style={styles.text}> {product.name} ({product.stock} st)</Text>);

    console.log(list);  // ser konstigt ut men det blir en array full av Text-komponenter med key och props

    return (
        <View>
            {list}
        </View>
    );
}

export default function Stock() {
    return (
        <View>
            <Text style={styles.title}>Lagerförteckning</Text>
            <StockList />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        backgroundColor: "#4D4741",
        color: '#FF9731',
        fontSize: 29,
        fontFamily: "sans-serif",
        textAlign: "center",
        marginBottom: 10,
        paddingTop: 7,
        paddingBottom: 7,
    },
    text: {
        color: '#333',
        fontSize: 17,
        fontFamily: "sans-serif",
        marginBottom: 10,
    }

});