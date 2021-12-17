import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type Product = {
  id:number;
  title:string;
  description:string;
  category:string;
  price:number;
  rating?:any;
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  takevalue = 0;

  constructor(private http:HttpClient) { }
  productList(){
    return this.http.get<Product[]>('http://fakestoreapi.com/products');

  }
  update(value:number){
    this.takevalue = value;

  }
}
