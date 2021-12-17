import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  cart:number = 0;
  cart$ = new BehaviorSubject(this.cart);
  title = 'test3';
  constructor(private prodServ:ProductService){

  }
  ngOnInit(): void {
      this.cart$.pipe(
        filter((cartCount:number)=>{
          if(cartCount > 0){
            return true;
          }else{
            return false;
          }
        })
      ).subscribe((res)=>console.log('subscribe',res));
  }
  addToCart(){
    this.cart++;
    this.cart$.next(this.cart);
  }
  removeCart(){
    this.cart--;
    // if(this.cart < 1){
    //   this.cart = 0;
      
    // }
    this.cart$.next(this.cart);
  }
}
