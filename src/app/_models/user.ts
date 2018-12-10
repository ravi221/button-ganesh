export class LoginUser {
  	email: string;
  	password: string;
}

export class UserClass {
    public user: User;
    public userprofile: UserProfile;
    public usersettings: UserSettings;
    public userwallet: UserWallet;
    public userpartner: UserPartner;
    public user_category_ref: any;
    constructor(){
        this.user = new User();
        this.userprofile = new UserProfile();
        this.usersettings = new UserSettings();
        this.userwallet = new UserWallet();
        this.userpartner = new UserPartner();
    }
}
export class User {
    public id: number;
    public uid: string;
    public Email: string;
    public Role: string;
    public ReferredBy: string;
    public ManagerId: string;

}

export class UserProfile {
    public uid: string;
    public Title: string;
    public FirstName: string;
    public LastName: string;
    public MiddleName: string;
    public Mobile: number;
    public Phone: number;
    public Company: string;
    public HouseNo: string;
    public Street: string;
    public Postcode: string;
    public Landmark: string;
    public City: string;
    public Country: string;
    
    constructor(){
        this.Title = 'Mr.';
    }
}


export class UserSettings {
    public uid: string;
    public Verified: number;
    public VerificationMethod: string;
    public VerificationValue: string;
    public ReceiveNewsLetter: number;
    public ReceivePromotionalOffers: number;
    public ReceiveExternalPromotionalOffers: number;    

    public Q1: string;
    public Q2: string;
    public Q3: string;
    public Q4: string;
    public Q5: string;

    public A1: string;
    public A2: string;
    public A3: string;
    public A4: string;
    public A5: string;
    constructor(){
        this.Verified = 0;
        this.ReceiveNewsLetter = 0;
        this.ReceivePromotionalOffers = 0;
        this.ReceiveExternalPromotionalOffers = 0;
    }
}

export class UserWallet {
    public uid: string;
    public Amount: number;
    public AllowedCreditLimit: number;
    constructor(
    ){}
}

export class UserPartner {
    public uid: string;
    public LocationId: string;
    public IsLocationOwner: number;
    public PriceForEachLead: number;
    public PriceForEachSaleType: string;
    public PriceForEachSale: number;
    constructor(
    ){}
}
