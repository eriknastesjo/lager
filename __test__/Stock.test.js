import { render } from '@testing-library/react-native';
import Stock from '../components/home/Stock';

jest.useFakeTimers();   // inte säker på vad detta är men utan den blir det felmeddelande
                        // ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.

jest.mock("../components/home/StockList", () => "StockList");

test('header should exist containing text Lagerförteckning', async () => {
    const { getByText } = render(<Stock />);
    const header = await getByText('Lagerförteckning');

    expect(header).toBeDefined();
});