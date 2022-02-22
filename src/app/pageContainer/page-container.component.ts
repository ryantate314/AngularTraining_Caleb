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
    @Output() selectedAssetDetails: Asset = null;

    selectAsset(selectedAssetNumber: number) {
      this.assetNumber = selectedAssetNumber;
      this.selectedAssetDetails = this.assets.find( x => x.assetTagId == this.assetNumber);
      console.log(this.selectedAssetDetails);
    }

    resetSelectedAsset(){
        this.assetNumber = null;
        this.selectedAssetDetails = null;
    }
}