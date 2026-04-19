import Order, { IOrder } from '../models/Order';
import { BaseRepository } from './BaseRepository';

export class OrderRepository extends BaseRepository<IOrder> {
    constructor() {
        super(Order);
    }
}
