import { User } from "./user";

export class Order {
    id: number;
    owner: User;
    productsIds = {};
    orderSummary: number;
    description: string;
    status: string;
}
