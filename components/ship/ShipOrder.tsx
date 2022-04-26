import { useState, useEffect } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Base, Typography, Table } from "../../styles";
import MapView, { Marker } from 'react-native-maps';
import getCoordinates from '../../models/nominatim';
import * as Location from 'expo-location';
import { DataTable } from 'react-native-paper';

export default function ShipOrder({ route }) {
    const { order } = route.params;

    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [initRegion, setInitRegion] = useState(null);

    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);


            setMarker(<Marker
                coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                title={results[0].display_name}
                identifier="there"
            />);


            setInitRegion({
                latitude: parseFloat(results[0].lat),
                longitude: parseFloat(results[0].lon),
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            })

            // setInitRegion({
            //     latitude: 60.128161,
            //     longitude: 18.643501,
            //     latitudeDelta: 20,
            //     longitudeDelta: 20,
            // })


        })();
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
                identifier="here"
            />);
        })();
    }, []);

    // const orderItemsTable = order.order_items.map((item, index) => {
    //     return <Text key={index} style={Typography.normal}>
    //         {item.name}, antal: {item.amount} st, plats: {item.location}
    //     </Text>;
    // });

    const orderItemsTable = order.order_items
        .map((item, index) => {
            return (<DataTable.Row key={index}>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell>{item.amount}</DataTable.Cell>
                <DataTable.Cell>{item.location}</DataTable.Cell>
            </DataTable.Row>)
        });


    return (
        <View style={Base.base}>
            <View style={Base.content}>
                <Text style={Typography.header2}>Order {order.id}</Text>
                <Text style={Typography.normal}>{order.name}</Text>
                <Text style={Typography.normal}>{order.address}</Text>
                <Text style={Typography.normal}>{order.zip} {order.city}</Text>

                {/* OBS OM INTE FUNKAR MED MARGINALER I TABELL BARA SKRIV UT DET OVAN... */}

                <DataTable style={Table.table}>
                    <DataTable.Header>
                        <DataTable.Title>Produktnamn</DataTable.Title>
                        <DataTable.Title>Antal</DataTable.Title>
                        <DataTable.Title>Plats</DataTable.Title>
                    </DataTable.Header>
                    {orderItemsTable}
                </DataTable>

                {/* <Text style={Typography.normal}>Produkter:</Text>

                {orderItemsTable} */}
            </View>
            <View style={styles.container}>
                <MapView
                    loadingEnabled={true}
                    loadingIndicatorColor='#FF9731'
                    style={styles.map}
                    initialRegion={initRegion}
                    // fitToSuppliedMarkers={["there", "here"]}
                >

                    {marker}
                    {locationMarker}

                </MapView>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});