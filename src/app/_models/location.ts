export class Location {
    constructor(
        public id?: number,
        public uid?: string,
        public UserId?: string,
        public Name?: string,
        public ShortCode?: string,
        public Country?: string,
        public Postcode?: string,
        public TimeZone?: string,
        public Ordering?: number,
        public AllowUsers?: number,
        public AllowPartners?: number,
        public Published?: number,
        public links?:any,
        public CreatedAt?: string,
        public UpdatedAt?: string,
        public CreatedBy?: string,
        public UpdatedBy?: string
    ){
        this.id = 0;
        this.uid = "";
        this.UserId = "";
        this.Name = "";
        this.ShortCode = "";
        this.Country = "INDIA";
        this.Postcode = "";
        this.TimeZone = "+05:30";
        this.Published = 0;
        this.Ordering = 0;
        this.AllowUsers = 0;
        this.AllowPartners = 0;
        this.links = undefined;
        this.CreatedAt = '';
        this.UpdatedAt = '';
        this.CreatedBy = '';
        this.UpdatedBy = '';
    }
}
