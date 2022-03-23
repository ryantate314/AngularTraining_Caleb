import { Asset } from '@/models/asset';
import { Component, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator, MatTable, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { AssetService } from './../services/asset.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LogService } from '@/shared/log.service';

@Component({
    selector: 'asset-list',
    styleUrls: ['asset-list.component.css'],
    templateUrl: 'asset-list.component.html',
})

export class AssetList {
    assets: Asset[] = [];
    assignedToQueryParam: string = null;
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

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChildren(MatTable) table: MatTable<any>;

    constructor(private route: ActivatedRoute, 
        private logger: LogService, 
        private router: Router, 
        private assetService: AssetService) {}

    ngOnInit() {
        //Update assets table datasource upon asset data changing
        this.getAssets().then(() => {
            this.dataSource.data = [...this.assets];
        });

        this.initFilterListeners();

        //Get employee ID from query parameters if it exists. 
        //This is used to see all assets assigned to an employee.
        this.route.queryParams.subscribe(params => {
            if (params.employeeId != null) {
                this.assignedToQueryParam = params.employeeId;
                this.assignedToFilter.setValue(params.employeeId);
            }
        });

        this.dataSource.filterPredicate = this.customFilterPredicate();
    }


    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    //Filter field listeners
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

            if (this.assignedToQueryParam != null) {
                this.router.navigate([], {
                    queryParams: {
                        'employeeId': null
                    },
                    queryParamsHandling: 'merge'
                });
            }
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

    //Clear all filter field values
    resetFilters() {
        this.tagIdFilter.setValue("");
        this.assetTypeFilter.setValue("");
        this.descriptionFilter.setValue("");
        this.dateAddedFilter.setValue("");
        this.assignedToFilter.setValue("");
        this.retiredFilter.setValue("");
        this.dateRetiredFilter.setValue("");
    }

    //Build filter predicate based on filter input field values
    customFilterPredicate() {
        const myFilterPredicate = (data: Asset, filter: string): boolean => {

            let searchString = JSON.parse(filter);

            return (data.assetTagId == null ? "" : data.assetTagId).toString().trim().indexOf(searchString.tagId) !== -1 &&
                (data.assetTagId == null ? "" : data.assetType).toString().trim().toLowerCase().indexOf(searchString.assetType.toLowerCase()) !== -1 &&
                (data.description == null ? "" : data.description).toString().trim().toLowerCase().indexOf(searchString.description.toLowerCase()) !== -1 &&
                (data.assignedTo == null ? "" : data.assignedTo).toString().trim().toLowerCase().indexOf(searchString.assignedTo.toLowerCase()) !== -1 &&
                (data.dateAdded == null ? "" : data.dateAdded).toString().trim().toLowerCase().indexOf(searchString.dateAdded.toLowerCase()) !== -1 &&
                (data.retired == null ? "" : data.retired).toString().indexOf(searchString.retired) !== -1 &&
                (data.dateRetired == null ? "" : data.dateRetired).toString().trim().toLowerCase().indexOf(searchString.dateRetired.toLowerCase()) !== -1;
        }

        return myFilterPredicate;
    }

    //Get all assets
    public getAssets() {
        this.logger.log("Fetching all asset data")
        return this.assetService.getAssets().toPromise().then(assetList => {
            this.assets = assetList;
        });
    }
}