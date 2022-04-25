import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from "../../styles";

export default function ShipOrder({ route }) {
    const { order } = route.params;
    console.log(order);

    return (
        <View style={Base.content}>
            <Text style={Typography.header2}>Skicka order</Text>


        </View>
    );
};

