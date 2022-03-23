import { Asset } from '@/models/asset';
import { AssetTypes } from '@/models/assetTypes';
import { Component, ViewChild } from '@angular/core';
import { MatOption, MatSelect } from '@angular/material';
import { AssetService } from './../services/asset.service';
import { Router } from '@angular/router';
import { LogService } from '@/shared/log.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'asset-form',
    styleUrls: ['asset-form.component.css'],
    templateUrl: 'asset-form.component.html',
})

export class AssetForm {
    asset: Asset = new Asset();
    assetTypes = AssetTypes;
    @ViewChild(MatSelect, { static: false }) assetType: MatSelect;

    constructor(private assetService: AssetService, 
        private logger: LogService, 
        private router: Router,
        private snackBar: MatSnackBar) {}

    createAsset(){
        this.logger.log("Creating new asset with Asset Type: " + this.asset.assetType + 
        ", Description: " + this.asset.description + 
        ", and Assigned To: " + this.asset.assignedTo);

        this.assetService.createAsset(this.asset)
            .subscribe(asset => {

                const snackBarRef = this.snackBar.open('Asset successfully created.', 'Dismiss', {
                    duration: 5000
                  });

                snackBarRef.afterDismissed().subscribe(() =>{
                    this.router.navigate(['/']);
                });

            },
                error => { 
                    this.logger.log("Error creating new asset, please try again.");
                });
    }

    resetForm(){
        this.asset = new Asset();
        this.assetType.options.forEach((data: MatOption) => data.deselect())
    }
}