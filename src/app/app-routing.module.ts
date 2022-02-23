import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetList } from './assets/asset-list.component';
import {AssetDetails} from './assets/asset-details.component';

const routes: Routes = [
  { path: '', component: AssetList},
  { path: 'details', component: AssetDetails}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }