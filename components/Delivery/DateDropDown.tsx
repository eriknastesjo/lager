import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, Button, View } from "react-native";


export default function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);
    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button
                    color='#4F4C4A'
                    onPress={showDatePicker}
                    title="Visa datumväljare"
                />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        if (date !== undefined) {
                            setDropDownDate(date);
                            props.setDelivery({
                                ...props.delivery,
                                delivery_date: convertDate(date)
                            });
                        }
                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}

function convertDate(dateString: string) {
    const date = new Date(dateString);
    return date.getFullYear().toString().slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
}