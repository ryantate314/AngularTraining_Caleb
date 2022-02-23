import { Asset } from '@/models/asset';
import { AssetService } from '@/services/asset.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'asset-details',
    styleUrls: ['asset-details.component.css'],
    templateUrl: 'asset-details.component.html',
})

export class AssetDetails {

    assetTagId: string;
    assetDetails: Asset;

    constructor(private route: ActivatedRoute, private assetService: AssetService) {

    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.assetTagId = params.assetTagId;
        });

        this.getAssetDetails();
    }

    getAssetDetails() {
        return this.assetService.getAssetById(this.assetTagId).toPromise().then(assetDetails => {
            this.assetDetails = assetDetails;
        });
    }

    retireAsset() {
        return this.assetService.retireAsset(this.assetTagId).toPromise().then(() =>{
            this.getAssetDetails();
        });
    }

    unretireAsset() {
        return this.assetService.unretireAsset(this.assetTagId).toPromise().then(() =>{
            this.getAssetDetails();
        });
    }

    updateAsset() {
        return this.assetService.updateAsset(this.assetDetails).toPromise().then(() =>{
            this.getAssetDetails();
        });
    }
}