import config from "../config/config.json";
import Invoice from "../interfaces/invoice";
import Token from "../interfaces/token";
import orderModel from "./orders";



const invoiceModel = {
    getInvoices: async function getInvoices(tokenObj: Partial<Token>): Promise<Invoice[]> {
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'content-type': 'application/json',
                'x-access-token': tokenObj.token
            },
            method: 'GET'
        })
        const result = await response.json();
        // console.log(result);
        return result.data;
    },
    setInvoice: async function setInvoices(tokenObj: Partial<Token>, invoice: Partial<Invoice>) {

        const orderUpdate = {
            id: invoice.order_id,
            name: invoice.name,
            status_id: 600,
            api_key: config.api_key
        };

        orderModel.updateOrder(orderUpdate);

        const inv = { ...invoice, api_key: config.api_key };

        console.log(inv);

        console.log(tokenObj.token);


        await fetch(`${config.base_url}/invoices`, {
            body: JSON.stringify(inv),
            headers: {
                'content-type': 'application/json',
                'x-access-token': tokenObj.token
            },
            method: 'POST'
        });


    }
};

export default invoiceModel;