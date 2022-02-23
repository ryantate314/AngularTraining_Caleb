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
  @Output() assets: Asset[];
  @Output() refresh: boolean;
  @Output() assetsChanged = new EventEmitter<Asset>();
  
  constructor(private assetService: AssetService){
    this.name = 'CGI Member';
  }

  ngOnInit(){
    this.getAssets();
  }



  //retrieves the list of assets from mock backend 
  public getAssets(){
    this.assetService.getAssets().subscribe(data => this.assets = data);
    this.refresh = true;
  }

}
