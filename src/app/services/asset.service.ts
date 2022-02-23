import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Asset } from '../models/asset'


// Demo asset service class to make HTTP requests. 
// The mock backend will intercept these requests and respond with a HTTP response.
@Injectable()
export class AssetService {

  constructor(private http: HttpClient) {}

  public createAsset(asset : Asset) : Observable<Asset> {
    return this.http.post<Asset>(`${environment.api_url}/assets`, asset);
  }

  public getAssets() : Observable<Asset[]> {
    return this.http.get<Asset[]>(`${environment.api_url}/assets`);
  }

  public getAssetById(assetTagId : string) : Observable<Asset> { 
    return this.http.get<Asset>(`${environment.api_url}/assets/` + assetTagId);
  }

  public retireAsset(assetTagId : string) : Observable<Asset> { 
    return this.http.delete<any>(`${environment.api_url}/assets/` + assetTagId + '/retire');
  }

  public unretireAsset(assetTagId : string) : Observable<Asset> { 
    return this.http.put<any>(`${environment.api_url}/assets/` + assetTagId + '/retire', null);
  }

}

