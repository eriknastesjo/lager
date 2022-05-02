import { View, ScrollView, Text } from 'react-native';
import { Base, Table, Typography } from '../../styles/index';
import { DataTable } from 'react-native-paper';
import StockList from './StockList';



export default function Stock({ products, setProducts }) {
    return (
        <ScrollView>
            <Text style={Typography.header1}>Lagerförteckning</Text>
            <View style={Base.content}>
                <DataTable style={Table.table}>
                    <DataTable.Header>
                        <DataTable.Title>Produktnamn</DataTable.Title>
                        <DataTable.Title numeric>Id</DataTable.Title>
                        <DataTable.Title numeric>Antal</DataTable.Title>
                    </DataTable.Header>
                    <StockList products={products} setProducts={setProducts} />
                </DataTable>
            </View>
        </ScrollView>
    );
}
