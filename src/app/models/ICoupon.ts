export interface ICoupon {
  _id?: string;
  couponCode?: string;
  discountType?: string;
  discountAmount?: string;
  maxDiscountAmount?: string;
  minPurchaseAmount?: string;
  expiredDate?: Date;
  usedUser?: string[];
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}