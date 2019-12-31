import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  // not being used since the service was replaced by ngrx
  sub: Subscription;
  // used to check subscription with ngrx effects
  componentActive = true;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;


  constructor(private _productService: ProductService, private _store: Store<fromProduct.State>) { }

  ngOnInit(): void {
    // replaced by ngrx
    // this.sub = this._productService.selectedProductChanges$.subscribe(
    //   selectedProduct => this.selectedProduct = selectedProduct
    // );

    // TODO: unsubscribe
    // using ngrx instead of the service
    this._store.pipe(select(fromProduct.getCurrentProduct)).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    // before using ngrx effects
    // this._productService.getProducts().subscribe(
    //   (products: Product[]) => this.products = products,
    //   (err: any) => this.errorMessage = err.error
    // );

    this.errorMessage$ = this._store.pipe(select(fromProduct.getError));

    // P8-2 - replaced product service with ngrx effects
    this._store.dispatch(new productActions.Load);
    
    // this._store.pipe(select(fromProduct.getProducts),
    //   takeWhile(() => this.componentActive)) 
    //   .subscribe((products: Product[]) => this.products = products);
    
    // P8-3 - unsubscribing using ngrx effects
    this.products$ = this._store.pipe(select(fromProduct.getProducts));

    // to be unsubscribed
    // without a selector
    // this._store.pipe(select('products')).subscribe(products => {

    //   if (products) {
    //     this.displayCode = products.showProductCode;
    //   }
    // });

    // using a selector
    this._store.pipe(select(fromProduct.getShowProductCode)).subscribe(showProductCode =>
      this.displayCode = showProductCode
      );
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();

    // P8-3 - unsubscribing using ngrx effects
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    // version 1
    // this.displayCode = value;

    // version 2
    // this._store.dispatch({
    //   type: 'TOGGLE_PRODUCT_CODE',
    //   payload: value
    // });

    // version 3
    this._store.dispatch(new productActions.ToggleProductCode(value));

  }

  newProduct(): void {
    // this._productService.changeSelectedProduct(this._productService.newProduct());

    // using ngrx instead of the service
    this._store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    // this._productService.changeSelectedProduct(product);

    // using ngrx instead of the service
    this._store.dispatch(new productActions.SetCurrentProduct(product));
  }

}
