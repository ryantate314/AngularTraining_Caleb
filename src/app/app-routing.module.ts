import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetList } from './assets/asset-list.component';
import { AssetDetails } from './assets/asset-details.component';
import { AssetForm } from './assets/asset-form.component';

const routes: Routes = [
  { path: '', component: AssetList},
  { path: 'details', component: AssetDetails},
  { path: 'new-asset', component: AssetForm}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }