import config from "../config/config.json";
import Invoice from "../interfaces/invoice";
import Token from "../interfaces/token";



const invoiceModel = {
    getInvoices: async function getInvoices(tokenObj: Partial<Token>): Promise<Invoice[]> {
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': tokenObj.token
            },
            method: 'GET'
        })
        const result = await response.json();
        return result.data;
    }
};

export default invoiceModel;