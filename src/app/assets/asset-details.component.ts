import { Asset } from '@/models/asset';
import { AssetService } from '@/services/asset.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LogService } from '../shared/log.service';

@Component({
    selector: 'asset-details',
    styleUrls: ['asset-details.component.css'],
    templateUrl: 'asset-details.component.html',
})

export class AssetDetails {

    assetTagId: string;
    assetDetails: Asset;

    constructor(
        private assetService: AssetService, 
        private logger: LogService, 
        private route: ActivatedRoute, 
        private snackBar: MatSnackBar) {}

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
        this.logger.log("Retiring asset with Asset Tag ID: " + this.assetTagId);
        return this.assetService.retireAsset(this.assetTagId).toPromise().then(() =>{
            this.getAssetDetails();
            this.snackBar.open('Asset successfully retired.', 'Dismiss', {
                duration: 5000
              });
        }).catch((error) => {
            this.logger.log(error);
            this.snackBar.open('Asset failed to retire, please try again.', 'Dismiss', {
                duration: 5000
              });
        });
    }

    unretireAsset() {
        this.logger.log("Un-retiring asset with Asset Tag ID: " + this.assetTagId);
        return this.assetService.unretireAsset(this.assetTagId).toPromise().then(() =>{
            this.getAssetDetails();
            this.snackBar.open('Asset successfully un-retired.', 'Dismiss', {
                duration: 5000
              });
        }).catch((error) => {
            this.logger.log(error);
            this.snackBar.open('Asset failed to un-retire, please try again.', 'Dismiss', {
                duration: 5000
              });
        });
    }

    updateAsset() {
        this.logger.log("Updating asset with Asset Tag ID: " + this.assetTagId);
        return this.assetService.updateAsset(this.assetDetails).toPromise().then(() =>{
            this.getAssetDetails();
            this.snackBar.open('Asset successfully updated.', 'Dismiss', {
                duration: 5000
              });
        }).catch((error) => {
            this.logger.log(error);
            this.snackBar.open('Asset failed to update, please try again.', 'Dismiss', {
                duration: 5000
              });
        });
    }
}