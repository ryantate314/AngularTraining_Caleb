import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
// used to create fake backend
import { mockBackendProvider } from './helpers/mock-backend';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AssetService } from './services/asset.service';
import { AssetList} from './assets/asset-list.component';
import { AssetDetails } from './assets/asset-details.component';
import { PageContainer } from './PageContainer/page-container.component';
import { ActiveAssetsPipe } from './assets/asset-active.pipe';
import { MatTableModule } from '@angular/material/table';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule, ReactiveFormsModule, MatSortModule, MatSelectModule, BrowserAnimationsModule],
  declarations: [AppComponent, HelloComponent, PageContainer, AssetList, AssetDetails, ActiveAssetsPipe],
  bootstrap: [AppComponent],
  providers: [AssetService, mockBackendProvider]
})
export class AppModule { }
