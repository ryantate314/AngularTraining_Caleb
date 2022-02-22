import { Component, Output } from '@angular/core';
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

  constructor(private assetService: AssetService){
    this.name = 'CGI Member';
  }

  ngOnInit(){
    this.getAssets();
  }

  // demo function that creates a new asset
  public addAssetDemo() {
    let newAsset = new Asset();
    newAsset.assetType = 'Computer';
    newAsset.description = 'A test of creating a new asset'
    newAsset.assignedTo = '5272';
    
    this.assetService.createAsset(newAsset)
      .subscribe(asset => { 
          this.getAssets(); // refresh assets list
          console.log(asset);
        }, 
        error => {});
    this.refresh = false;
  }

  // retrieves the list of assets from mock backend 
  public getAssets(){
    this.assetService.getAssets().subscribe(data => this.assets = data);
    console.log(this.assets);
    this.refresh = true;
  }

}
