import { Photo } from './Photo';
import { isObject } from 'util';

export class Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    count = 1;
//Photo?: Photo;
constructor(json?: any) {
    this.id = json.id;
    this.title = json.title;
    this.description = json.description;
    this.category = json.category;
    this.price = json.price;
    this.count = 1;
  }

}
