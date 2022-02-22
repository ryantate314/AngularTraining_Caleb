import { Asset } from '@/models/asset';
import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'page-container',
  templateUrl: './page-container.component.html',
  styleUrls: [ './page-container.component.css' ]
})

export class PageContainer {
    @Input() assets: Asset[] = [];
    @Input() refresh: boolean;
    assetNumber: number = null;

    updateAssetNumber(num: number) {
        console.log("From page container: " + num)
        //this.assetNumber = num;
    }

    selectAsset(selectedAssetNumber: number) {
      this.assetNumber = selectedAssetNumber;
    }

    resetSelectedAsset(){
        this.assetNumber = null;
    }
}