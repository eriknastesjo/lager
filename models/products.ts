import config from "../config/config.json";
// import Order from "../interfaces/order";
import OrderItem from "../interfaces/order_item";

const products = {
    getProducts: async function getProducts() {     // TODO lägga till return type (interface)
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;

    },
    updateProduct: async function updateProduct(product: Partial<OrderItem>) {
        await fetch(`${config.base_url}/products?api_key=${config.api_key}`, {
            body: JSON.stringify(product),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        })
    },

};

export default products;