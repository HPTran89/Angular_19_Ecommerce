import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products-old/products.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './shared/components/home/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'products',
        component: ProductsComponent
    }
    // {
    //     path: 'my-orders',
    //     component: MyProductComponent
    // },
    // // {
    // //     path: 'my-products',
    // //     component: MyProductComponent
    // // },
    // {
    //     path: 'my-products/:id',
    //     loadChildren: () => import('./pages/my-products/my-product/my-product.component').then(m => m.MyProductComponent)
    // },
    // {
    //     path: 'create-order',
    //     component: CreateOrderComponent
    // }
];
