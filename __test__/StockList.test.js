import { render } from '@testing-library/react-native';
import StockList from '../components/home/StockList';

const products = [
    { name: "Shampoo", stock: 2 },
    { name: "Balsam", stock: 3 },
    { name: "Tvål", stock: 15 },
];

// en funktion som returnerar något godtyckligt (spelar ingen roll vad) för att
// hindra products från att bli överskuggad (overridden)
const setProducts = () => "false";

test('StockList should contain three items', async () => {
    const { getByText } = render(<StockList products={products} setProducts={setProducts} />);

    // // uncomment to see what is rendered in StockList component:
    // const { getByText, debug } = render(<StockList products={products} setProducts={setProducts} />);
    // debug("Stocklist component");

    // Observera att exact: false gör att sökningen blir då delsträng och inte exakt sökning!
    const shampoo = await getByText('Shampoo', { exact: false });
    const balsam = await getByText('Balsam', { exact: false });
    const soap = await getByText('Tvål', { exact: false });

    expect(shampoo).toBeDefined();
    expect(balsam).toBeDefined();
    expect(soap).toBeDefined();
});