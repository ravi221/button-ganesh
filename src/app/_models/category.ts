export class Category {
    constructor(
        public id?: number,
        public uid?: string,
        public Name?: string,
        public Alias?: string,
        public Content?: string,
        public Img?: string,
        public Icon?: string,
        public Ordering?: number,
        public AllowUsers?: number,
        public AllowPartners?: number,
        public Published?: number,
        public links?:any,
        public CreatedAt?: string,
        public UpdatedAt?: string,
        public UserId?: string,
        public LocationId?: string,
        public CategoryType?: string,
        public ParentId?:string,
        public Tags?:string

    ){
        this.id = 0;
        this.uid = "";
        this.Name = "";
        this.Alias = "";
        this.Published = 0;
        this.Ordering = 0;
        this.AllowUsers = 0;
        this.AllowPartners = 0;
        this.links = undefined;
        this.CreatedAt = '';
        this.UpdatedAt = '';
        this.CategoryType = 'SERVICE';
        this.LocationId = 'bN2pBGeQImsM'; // India
        this.ParentId = '';
        this.Tags = '';
    }
}
