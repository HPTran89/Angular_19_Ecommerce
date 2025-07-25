import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products-old/products.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './shared/components/home/home/home.component';
import { AllAboutCommunicationComponent } from './pages/all-about-communication/all-about-communication.component';
import { MultiStepFormComponentComponent } from './pages/multi-step-form-component/multi-step-form-component.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'communication',
        component: AllAboutCommunicationComponent
    },
    {
        path: 'identification-form',
        component: MultiStepFormComponentComponent
    },
    {
        path: 'reactive-form-builder',
        loadComponent: () => import('./pages/reactive-form-builder/reative-form-builder/reative-form-builder.component').then(m => m.ReativeFormBuilderComponent)
    }
    // {
    //     path: 'my-products/:id',
    //     loadChildren: () => import('./pages/my-products/my-product/my-product.component').then(m => m.MyProductComponent)
    // },
    // {
    //     path: 'create-order',
    //     component: CreateOrderComponent
    // }
];
