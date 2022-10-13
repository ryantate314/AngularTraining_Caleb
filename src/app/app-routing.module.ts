import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetList } from './assets/asset-list.component';
import { AssetDetails } from './assets/asset-details.component';
import { NewAssetForm } from './assets/new-asset-form.component';

const routes: Routes = [
  { path: '', component: AssetList},
  // TODO: Recommend using route parameters instead of query params. e.g. details/:id
  // https://www.samjulien.com/how-to-use-route-parameters-in-angular
  { path: 'details', component: AssetDetails},
  { path: 'new-asset', component: NewAssetForm}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }