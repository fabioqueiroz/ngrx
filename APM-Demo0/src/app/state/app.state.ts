import { ProductState } from "../products/state/product.reducer";
import { UserState } from "../user/state/user.reducer";

export interface State {
    // in this case 'products' violates the lazy loading feature of the app; another
    // interface should be created to extend this one only for lazy loaded features
    // products: ProductState; 
    users: UserState;
}