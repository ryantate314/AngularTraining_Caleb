import { Asset } from '@/models/asset';
import { Component, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator, MatTable, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { AssetService } from './../services/asset.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'asset-list',
    styleUrls: ['asset-list.component.css'],
    templateUrl: 'asset-list.component.html',
})

export class AssetList {
    assets: Asset[] = [];

    constructor(private route: ActivatedRoute, private assetService: AssetService) {

    }

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChildren(MatTable) table: MatTable<any>;

    displayedColumns = ['assetTagId', 'assetType', 'description', 'dateAdded', 'assignedTo', 'retired', 'dateRetired'];
    dataSource = new MatTableDataSource<Asset>(this.assets);
    filteredValues = {
        tagId: '', assetType: '', description: '', dateAdded: '', assignedTo: '', retired: '', dateRetired: ''
    };

    tagIdFilter = new FormControl();
    assetTypeFilter = new FormControl();
    descriptionFilter = new FormControl();
    dateAddedFilter = new FormControl();
    assignedToFilter = new FormControl();
    retiredFilter = new FormControl();
    dateRetiredFilter = new FormControl();

    ngOnInit() {
        this.getAssets().then(() => {
            this.dataSource.data = [...this.assets];
        });

        this.initFilterListeners();

        this.route.queryParams.subscribe(params => {
            if (params.employeeId != null) {
                this.assignedToFilter.setValue(params.employeeId);
            }
        });

        this.dataSource.filterPredicate = this.customFilterPredicate();
    }


    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    initFilterListeners() {
        this.tagIdFilter.valueChanges.subscribe((filterValue) => {
            this.filteredValues['tagId'] = filterValue;
            this.dataSource.filter = JSON.stringify(this.filteredValues);
        });

        this.assetTypeFilter.valueChanges.subscribe((filterValue) => {
            this.filteredValues['assetType'] = filterValue;
            this.dataSource.filter = JSON.stringify(this.filteredValues);
        });

        this.descriptionFilter.valueChanges.subscribe((filterValue) => {
            this.filteredValues['description'] = filterValue;
            this.dataSource.filter = JSON.stringify(this.filteredValues);
        });

        this.dateAddedFilter.valueChanges.subscribe((filterValue) => {
            this.filteredValues['dateAdded'] = filterValue;
            this.dataSource.filter = JSON.stringify(this.filteredValues);
        });

        this.assignedToFilter.valueChanges.subscribe((filterValue) => {
            this.filteredValues['assignedTo'] = filterValue;
            this.dataSource.filter = JSON.stringify(this.filteredValues);
        });

        this.retiredFilter.valueChanges.subscribe((filterValue) => {
            this.filteredValues['retired'] = filterValue;
            this.dataSource.filter = JSON.stringify(this.filteredValues);
        });

        this.dateRetiredFilter.valueChanges.subscribe((filterValue) => {
            this.filteredValues['dateRetired'] = filterValue;
            this.dataSource.filter = JSON.stringify(this.filteredValues);
        });
    }

    resetFilters() {
        this.tagIdFilter.setValue("");
        this.assetTypeFilter.setValue("");
        this.descriptionFilter.setValue("");
        this.dateAddedFilter.setValue("");
        this.assignedToFilter.setValue("");
        this.retiredFilter.setValue("");
        this.dateRetiredFilter.setValue("");
    }

    customFilterPredicate() {
        const myFilterPredicate = (data: Asset, filter: string): boolean => {

            let searchString = JSON.parse(filter);

            return (data.assetTagId == null ? "" : data.assetTagId).toString().trim().indexOf(searchString.tagId) !== -1 &&
                (data.assetTagId == null ? "" : data.assetTagId).toString().trim().toLowerCase().indexOf(searchString.assetType.toLowerCase()) !== -1 &&
                (data.description == null ? "" : data.description).toString().trim().toLowerCase().indexOf(searchString.description.toLowerCase()) !== -1 &&
                (data.assignedTo == null ? "" : data.assignedTo).toString().trim().toLowerCase().indexOf(searchString.assignedTo.toLowerCase()) !== -1 &&
                (data.dateAdded == null ? "" : data.dateAdded).toString().trim().toLowerCase().indexOf(searchString.dateAdded.toLowerCase()) !== -1 &&
                (data.retired == null ? "" : data.retired).toString().indexOf(searchString.retired) !== -1 &&
                (data.dateRetired == null ? "" : data.dateRetired).toString().trim().toLowerCase().indexOf(searchString.dateRetired.toLowerCase()) !== -1;
        }

        return myFilterPredicate;
    }

    // demo function that creates a new asset
    public addAssetDemo() {
        let newAsset = new Asset();
        newAsset.assetType = 'Computer';
        newAsset.description = 'A test of creating a new asset'
        newAsset.assignedTo = '5272';

        this.assetService.createAsset(newAsset)
            .subscribe(asset => {
                this.dataSource.data = [...this.assets];
            },
                error => { });
    }

    public getAssets() {
        return this.assetService.getAssets().toPromise().then(assetList => {
            this.assets = assetList;
        });
    }
}