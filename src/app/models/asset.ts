/* TODO: Typically Angular apps use interfaces for this instead of classes. Because TypeScript objects
   are just JavaScript objects at run time, they are not guarenteed to have methods like normal classes.

   e.g.

   class Asset {
    public firstName: string;
    public lastName: string;
    public getFullName() { return firstName + ' ' + lastName; }
   }

   this.http.get<Asset>('/asset/12345').subscribe(asset => {
    console.log(asset.getFullName());
    // Throws an error saying getFullName() is undefined because these aren't really Asset objects. Just JSON data. No logic.
   })
 */
export class Asset {
    public assetTagId : number;
    public assetType : string; 
    public description : string;
    public assignedTo : string;
    public dateAdded : Date;
    public retired : boolean;
    public dateRetired : Date;
  
    constructor(){};

  }