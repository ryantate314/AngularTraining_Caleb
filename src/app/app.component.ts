import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Asset } from './models/asset'
import { AssetService } from './services/asset.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent  {
  name: string;
  
  constructor(private assetService: AssetService){
    this.name = 'CGI Member';
  }

}
