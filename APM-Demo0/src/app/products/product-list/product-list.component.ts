import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../state/product.reducer';
import * as productActions from '../state/product.actions';

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
  sub: Subscription;

  constructor(private _productService: ProductService, private _store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.sub = this._productService.selectedProductChanges$.subscribe(
      selectedProduct => this.selectedProduct = selectedProduct
    );

    this._productService.getProducts().subscribe(
      (products: Product[]) => this.products = products,
      (err: any) => this.errorMessage = err.error
    );
    
    // to be unsubscribed
    // without a selector
    // this._store.pipe(select('products')).subscribe(products => {

    //   if (products) {
    //     this.displayCode = products.showProductCode;
    //   }
    // });

    // using a selector
    this._store.pipe(select(fromRoot.getShowProductCode)).subscribe(showProductCode =>
      this.displayCode = showProductCode
      );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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
    this._productService.changeSelectedProduct(this._productService.newProduct());
  }

  productSelected(product: Product): void {
    this._productService.changeSelectedProduct(product); 
  }

}
