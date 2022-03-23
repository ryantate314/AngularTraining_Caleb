import { Asset } from '@/models/asset';
import { AssetTypes } from '@/models/assetTypes';
import { Component, ViewChild } from '@angular/core';
import { MatOption, MatSelect } from '@angular/material';
import { AssetService } from './../services/asset.service';
import { Router } from '@angular/router';

@Component({
    selector: 'asset-form',
    styleUrls: ['asset-form.component.css'],
    templateUrl: 'asset-form.component.html',
})

export class AssetForm {
    asset: Asset = new Asset();
    assetTypes = AssetTypes;
    @ViewChild(MatSelect, { static: false }) assetType: MatSelect;
    constructor(private assetService: AssetService, private router: Router) {

    }

    createAsset(){
        this.assetService.createAsset(this.asset)
            .subscribe(asset => {
                this.router.navigate(['/']);
            },
                error => { });
    }

    resetForm(){
        this.asset = new Asset();
        this.assetType.options.forEach((data: MatOption) => data.deselect())
    }
}