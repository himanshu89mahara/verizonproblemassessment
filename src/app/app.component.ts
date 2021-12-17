import { AfterContentChecked, AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { iif, map, mergeMap, of } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { Product,ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'test3';
  
  constructor(
    private authGaurd: AuthGuard,
    private route: ActivatedRoute,
    private router:Router){
  }

  ngOnInit(): void {
   // this.checkAuthenication();
    this.updateRoutes();
    // this.productServ.update(2);
    // console.log('Product Service Update in AppComponent',this.productServ.takevalue);

    let observable1$ = of('yes');   //First execution
    let observable2$ = of(1,2,3,4,5,6,7,8,9);  //execute when ob1 is yes
    let observable3$ = of(['A','B']); //exexcute when ob1 is no
    let observable4$ = of(30,40,50); // ob4 and ob5 merge either with ob2 or ob3 based on condition
    let observable5$ = of('X','Y','Z');
    observable1$.pipe(
      mergeMap(
        (res)=>iif(()=>res==='yes',observable2$,observable3$)
      ),
      mergeMap(
        (ob3)=>{
          console.log(ob3,'---ob3')
          return observable4$.pipe(
          mergeMap((ob4)=>observable5$.pipe(
            map((ob5)=>`${ob3} ${ob4} ${ob5}`)
          )),
        )}
      )
    ).subscribe((res)=>console.log(res));


    
  }
  
  checkAuthenication(){
    if(this.authGaurd.canActivate(this.route.snapshot,this.router.routerState.snapshot)){
      console.log('authguard init');
    }else{
      this.router.navigate(["/user/login"]);
     console.log('should be redirect');
    }
    return;
  }

  updateRoutes(){
    for(let _routeIndex in this.router.config){
      if(this.router.config[_routeIndex].component){
        this.router.config[_routeIndex].canActivate = [AuthGuard];
      }
      if(this.router.config[_routeIndex].loadChildren){
        this.router.config[_routeIndex].canActivateChild = [AuthGuard];
      }
      
    }

    
  }
  
}
