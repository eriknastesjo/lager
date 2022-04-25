import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from "../../styles";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import getCoordinates from '../../models/nominatim';
import * as Location from 'expo-location';

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
            />);

            setInitRegion({
                latitude: parseFloat(results[0].lat),
                longitude: parseFloat(results[0].lon),
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            })

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
            />);
        })();
    }, []);

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Skicka order</Text>

            <Text style={Typography.normalCenter}>{order.name} : {order.id}</Text>
            <Text style={Typography.normalCenter}>{order.address}</Text>
            <Text style={Typography.normalCenter}>{order.city}, {order.country}</Text>
            <View style={styles.container}>
                <MapView
                    loadingEnabled={true}
                    loadingIndicatorColor='#FF9731'
                    style={styles.map}
                    initialRegion={initRegion}>

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