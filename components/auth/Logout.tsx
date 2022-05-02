import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Typography } from '../../styles';
import { View, Text, Button } from "react-native";

export default function Logout({ setIsLoggedIn }) {


    function goToLoginMenu() {
        setIsLoggedIn(false);
    }

    return (
        <View>
            <Text style={Typography.header1}>Utloggning</Text>
            <Button
                color='#A85D14'
                title="Logga ut"
                onPress={goToLoginMenu}
            />
        </View>
    );
};