import config from "../config/config.json";
// import Order from "../interfaces/order";
import OrderItem from "../interfaces/order_item";
import Product from "../interfaces/product";

const productModel = {
    getProducts: async function getProducts(): Promise<Product[]> {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    },
    getIndividualProduct: async function getIndividualProduct(id: number): Promise<Product> {
        const response = await fetch(`${config.base_url}/products/${id}?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    },
    updateProduct: async function updateProduct(product: Partial<Product>) {
        await fetch(`${config.base_url}/products`, {
            body: JSON.stringify(product),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        })
    },

};

export default productModel;