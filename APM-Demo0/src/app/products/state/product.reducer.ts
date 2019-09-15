import { JsonPipe } from "@angular/common";
import { Product } from "../product";
import * as fromRoot from '../../state/app.state';
import { InitialState } from "@ngrx/store/src/models";

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