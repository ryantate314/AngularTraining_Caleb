import { Asset } from '@/models/asset';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
    selector: 'asset-details',
    styleUrls: ['asset-details.component.css'],
    templateUrl: 'asset-details.component.html',
})

export class AssetDetails {
    @Input() assetDetails: Asset;
    tagId = new FormControl();
    assetType = new FormControl();
    description = new FormControl();
    dateAdded = new FormControl();
    assignedTo = new FormControl();
    retired = new FormControl();
    dateRetired = new FormControl();


    ngAfterViewInit(){
        console.log(this.assetDetails);
    }

}