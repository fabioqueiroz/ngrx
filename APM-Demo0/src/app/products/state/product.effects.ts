import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ProductService } from "../product.service";
import * as productActions from "./product.actions";
import { mergeMap, map, catchError } from "rxjs/operators";
import { Product } from "../product";
import { of, Observable } from "rxjs";
import { Action } from '@ngrx/store'


@Injectable() 
export class ProductEffects {

    constructor(private _actions$: Actions,
                private _productService: ProductService){}
    
    @Effect()
    loadProducts$: Observable<Action> = this._actions$.pipe(
        ofType(productActions.ProductActionTypes.Load),
        mergeMap((action: productActions.Load) => this._productService.getProducts().pipe(
            map((products: Product[]) => (new productActions.LoadSuccess(products))),
            catchError(err => of(new productActions.LoadFail(err)))
        ))
    );

    @Effect()
    updateProduct$: Observable<Action> = this._actions$.pipe(
        ofType(productActions.ProductActionTypes.UpdateProduct),
        map((action: productActions.UpdateProduct) => action.payload),
        mergeMap((product: Product) => 
            this._productService.updateProduct(product).pipe(
                map(updatedProduct => (new productActions.UpdateProductSuccess(updatedProduct))),
                catchError(err => of(new productActions.UpdateProductFail(err)))
            )
        )
    );
}