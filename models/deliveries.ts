import config from "../config/config.json";
import Delivery from "../interfaces/delivery";
import productModel from "./products";



const deliveryModel = {
    getDeliveries: async function getDeliveries(): Promise<Delivery[]> {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    },
    setDelivery: async function setDelivery(delivery: Partial<Delivery>) {

        const deliv = { ...delivery, api_key: config.api_key };

        const product = await productModel.getIndividualProduct(delivery.product_id);

        const prodUpdate = {
            id: delivery.product_id,
            name: delivery.product_name,
            stock: product.stock + delivery.amount,
            api_key: config.api_key
        };
        productModel.updateProduct(prodUpdate);

        await fetch(`${config.base_url}/deliveries`, {
            body: JSON.stringify(deliv),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
    }
};

export default deliveryModel;