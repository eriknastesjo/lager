import { Typography } from '../../styles/index';
import productModel from '../../models/products';
import { DataTable } from 'react-native-paper';
import { useEffect } from 'react';


export default function StockList({ products, setProducts }) {
    // const [products, setProducts] = useState([]);
    // ligger istället i App.tsx för att bli åtkomlig för andra script!

    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);


    // const list = products.map((product, index) => <Text key={index} style={Typography.normal}> {product.name} : { product.id } ({product.stock} st)</Text>);

    const list = products
        .map((product, index) => {
            return (<DataTable.Row key={index}>
                <DataTable.Cell textStyle={Typography.normalCenter}>{product.name}</DataTable.Cell>
                <DataTable.Cell numeric textStyle={Typography.normalCenter}>{product.id}</DataTable.Cell>
                <DataTable.Cell numeric textStyle={Typography.normalCenter}>{product.stock}</DataTable.Cell>
            </DataTable.Row>)
        });

    return list;
}