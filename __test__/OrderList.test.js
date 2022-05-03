import { render, screen } from '@testing-library/react-native';
import OrderList from '../components/pick/OrderList';
// import { screen } from '@testing-library/dom'

const orders = [
    {
        "id": 1345,
        "name": "Anders Andersson",
        "address": "Andersgatan 1",
        "zip": "12345",
        "city": "Anderstorp",
        "country": "Sweden",
        "status": "Ny",
        "status_id": 100,
        "order_items": [
        ]
    },
    {
        "id": 21255,
        "name": "Bengt Bengtsson",
        "address": "Bengtsgatan 2",
        "zip": "23457",
        "city": "Bengtfors",
        "country": "Sweden",
        "status": "Ny",
        "status_id": 100,
        "order_items": [
        ]
    },
    {
        "id": 33453,
        "name": "Nora Norrby",
        "address": "Norasgatan 3",
        "zip": "34567",
        "city": "Nora",
        "country": "Sweden",
        "status": "Packad",
        "status_id": 200,
        "order_items": [
        ]
    },
    {
        "id": 42342,
        "name": "Ulla Ullman Davidsson",
        "address": "Ullasallén 4",
        "zip": "45678",
        "city": "Ullared",
        "country": "Sweden",
        "status": "Fakturerad",
        "status_id": 600,
        "order_items": [
        ]
    }
];

// definiera route till något godtyckligt för att unvika kompileringsfel
const route = "false";

// en funktion som returnerar något godtyckligt (spelar ingen roll vad) för att
// hindra orders från att bli överskuggad (overridden)
const setOrders = () => "false";

test('Header should exist containing text Ordrar)', async () => {
    const { getByText } = render(<OrderList route={route} orders={orders} setOrders={setOrders} />);

    // // uncomment to see what is rendered in OrderList component:
    // const { getByText, debug } = render(<OrderList route={route} orders={orders} setOrders={setOrders} />);
    // debug("OrderList component");

    const header = await getByText('Ordrar');

    expect(header).toBeDefined();

});

test('OrderList should contain name and ordernumber from orders with status Ny)', async () => {
    const { getByText } = render(<OrderList route={route} orders={orders} setOrders={setOrders} />);

    // // uncomment to see what is rendered in OrderList component:
    // const { getByText, debug } = render(<OrderList route={route} orders={orders} setOrders={setOrders} />);
    // debug("OrderList component");


    // Observera att exact: false gör att sökningen blir då delsträng och inte exakt sökning!
    const name = await getByText('Anders Andersson', { exact: false });
    const ordernr = await getByText('21255', { exact: false });

    expect(name).toBeDefined();
    expect(ordernr).toBeDefined();

});

test('OrderList should not contain name or ordernumber from orders with status Packad or Fakturerad)', async () => {
    // observera att vi hämtar och använder queryByText istället för getByText
    const { queryByText } = render(<OrderList route={route} orders={orders} setOrders={setOrders} />);

    // // uncomment to see what is rendered in OrderList component:
    // const { queryByText, debug } = render(<OrderList route={route} orders={orders} setOrders={setOrders} />);
    // debug("OrderList component");

    const name = await queryByText('Nora Norrby', { exact: false });
    const ordernr = await queryByText('42342', { exact: false });

    expect(name).toBeNull()
    expect(ordernr).toBeNull();

});

