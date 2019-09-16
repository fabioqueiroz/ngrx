import { JsonPipe } from "@angular/common";
import { Product } from "../product";
import * as fromRoot from '../../state/app.state';
import { InitialState } from "@ngrx/store/src/models";
import { createFeatureSelector, createSelector } from "@ngrx/store";

// extend the app state for lazy loaded features
export interface State extends fromRoot.State{
    products: ProductState; 
}

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
}

// ensures the state in the reducer is initialized
const initialState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    products: []
};

// product selectors
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(getProductFeatureState, state => state.showProductCode);

export const getCurrentProduct = createSelector(getProductFeatureState, state => state.currentProduct);

export const getProducts = createSelector(getProductFeatureState, state => state.products);


export function reducer(state = initialState, action): ProductState {

    switch(action.type) {
        
        case 'TOGGLE_PRODUCT_CODE':

            return {
                ...state,
                showProductCode: action.payload
            };
            
        default:
            return state;
    }
}