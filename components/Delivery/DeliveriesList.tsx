// del av components/DeliveriesList.tsx
import { useState, useEffect } from 'react';
import { Button, Text, View, ScrollView} from 'react-native';
import { Base, Typography } from '../../styles/index';
import deliveryModel from '../../models/deliveries';

export default function Deliveries({ route, navigation }) {

    const [allDeliveries, setDeliveries] = useState([]);

    let { reload } = route.params || true;

    if (reload) {
        console.log("reload");
        reloadDeliveries();
        route.params = false;
    }

    async function reloadDeliveries() {
        console.log("get deliveries");
        setDeliveries(await deliveryModel.getDeliveries());
    }

    useEffect(async () => {
        reloadDeliveries();
    }, []);

    const list = allDeliveries.map((delivery, index) => <Text key={index} style={Typography.normal}> {delivery.product_name
    } (antal: {delivery.amount} st, levererad: {delivery.delivery_date}, kommentar: {delivery.comment})</Text>);


 {
        return (
            <View>
                <Text style={Typography.header1}>Inleveranser</Text>
                <ScrollView style={Base.content}>
                    {list.length !== 0 ?
                        list :
                        <Text style={Typography.normal}>Inga inleveranser registrerade.</Text>
                    }
                </ScrollView>
                <Button
                    title="Ny inleverans"
                    color='#A85D14'
                    onPress={() => {
                        navigation.navigate('Form');
                    }}
                />
            </View>
        );
    }
};

