export class Item {
    public uid: string;
    public CategoryId: string;
    public Title: string;
    public Alias: string;
    public ShortDesc: string;
    public LongDesc: string;
    public IsPublished: string;
    public CreatedAt: number;
    public UpdatedAt: number;
    public CreatedBy: string;
    public UserUID: string;
    public ItemType: string;
    public Quantity: string;
    public Warranty: string;
    public Guarantee: string;

    // If this item is for sale 
    public IsForSale: string;
    public Price: string;
    public Discount: string;
    public DiscountType: string;


    public Tags: string;

    public Brand: string;
    public BrandModel: string;
    public SerialNo: string;
    public DateOfPurchase: number;
    public PurchasePrice: string;

    constructor() {
        this.Title="";
        this.Brand="";
        this.CategoryId="";
    }
}
