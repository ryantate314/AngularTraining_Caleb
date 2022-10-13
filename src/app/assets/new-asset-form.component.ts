import { Asset } from '@/models/asset';
import { AssetTypes } from '../constants/assetTypes';
import { Component, ViewChild } from '@angular/core';
import { MatOption, MatSelect } from '@angular/material';
import { AssetService } from '../services/asset.service';
import { Router } from '@angular/router';
import { LogService } from '@/shared/log.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'new-asset-form',
    styleUrls: ['new-asset-form.component.css'],
    templateUrl: 'new-asset-form.component.html',
})

export class NewAssetForm {
    asset: Asset = new Asset();
    assetTypes = AssetTypes;
    @ViewChild(MatSelect, { static: false }) assetType: MatSelect;

    constructor(private assetService: AssetService,
        private logger: LogService,
        private router: Router,
        private snackBar: MatSnackBar) { }

    //Create new asset
    createAsset() {

        // TODO: Need to make sure form is valid before performing the save.

        this.logger.log("Creating new asset with Asset Type: " + this.asset.assetType +
            ", Description: " + this.asset.description +
            ", and Assigned To: " + this.asset.assignedTo);

        this.assetService.createAsset(this.asset)
            .subscribe(() => {

                const snackBarRef = this.snackBar.open('Asset successfully created.', 'Dismiss', {
                    duration: 5000
                });

                // TODO: These aren't actual page navigations, so the snackbar can show up even on the asset list page. Consider
                // redirecting immediately instead of waiting for the 5 second delay.
                snackBarRef.afterDismissed().subscribe(() => {
                    this.router.navigate(['/']);
                });

            },
                error => {
                    this.logger.log("Error creating new asset: " + error);
                    const snackBarRef = this.snackBar.open('Error creating new asset, please try again.', 'Dismiss', {
                        duration: 5000
                    });
                });
    }

    //Reset all form fields
    resetForm() {
        this.asset = new Asset();
        this.assetType.options.forEach((data: MatOption) => data.deselect())
    }
}