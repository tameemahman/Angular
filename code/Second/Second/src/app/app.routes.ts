import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { SecondcontactComponent } from './secondcontact/secondcontact.component';
import { ThirdComponent } from './third/third.component';

export const routes: Routes = [


    {path: "Second", component: SecondcontactComponent},

    {path: "Third", component: ThirdComponent},

];
