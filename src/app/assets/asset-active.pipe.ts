import { Asset } from '@/models/asset';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'activeAssetsPipe1',
    pure: false
})
export class ActiveAssetsPipe implements PipeTransform {
    transform(assets: Asset[]): any {
        if (!assets) {
            return false;
        }
        // return assets.filter(asset => asset.retired == false);
        return assets;
    }
}