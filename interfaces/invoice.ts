export default interface Invoice{
    id: string,
    order_id: number,
    total_price: number,
    creation_date: number,
    due_date: number,
}