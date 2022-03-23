import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { mockBackendProvider } from './helpers/mock-backend';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AssetService } from './services/asset.service';
import { AssetList} from './assets/asset-list.component';
import { AssetDetails } from './assets/asset-details.component';
import { ActiveAssetsPipe } from './assets/asset-active.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module'
import { AssetForm } from './assets/asset-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LogService } from './shared/log.service';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, MatTableModule, MatProgressSpinnerModule, MatFormFieldModule, MatPaginatorModule, MatInputModule, ReactiveFormsModule, MatSortModule, MatSelectModule, MatSnackBarModule, BrowserAnimationsModule],
  declarations: [AppComponent, HelloComponent, AssetList, AssetDetails, AssetForm, ActiveAssetsPipe],
  bootstrap: [AppComponent],
  providers: [AssetService, LogService, mockBackendProvider]
})

export class AppModule { }
