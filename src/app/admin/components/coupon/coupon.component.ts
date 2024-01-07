import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CouponService } from '../../services/coupon.service';
import { ToastrService } from 'ngx-toastr';
import { ICoupon } from 'src/app/models/ICoupon';
import { ConfirmModalService } from 'src/app/shared/services/confirm-modal.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css'],
})
export class CouponComponent implements OnInit {
  openModalValue: boolean = false;
  couponForm: FormGroup;
  couponDatas: ICoupon[];
  modalButton: string;
  isEditCoupon: boolean = false;
  couponId: string;

  constructor(
    private _fb: FormBuilder,
    private _couponService: CouponService,
    private _toastr: ToastrService,
    private _confirmService: ConfirmModalService
  ) {}

  ngOnInit(): void {
    this.couponForm = this._fb.group({
      couponCode: ['', [Validators.required, this.validateEmptySpace]],
      discountType: ['', Validators.required],
      discountAmount: [
        '',
        [Validators.required, Validators.min(0), this.validateNumber],
      ],
      maxDiscountAmount: [
        '',
        [Validators.required, Validators.min(0), this.validateNumber],
      ],
      minPurchaseAmount: [
        '',
        [Validators.required, Validators.min(0), this.validateNumber],
      ],
      expiredDate: ['', [Validators.required, this.validateExpiredDate]],
    });

    this.getCouponData();
  }

  validateExpiredDate(control: FormControl) {
    const currentDate = new Date();
    const inputDate = new Date(control.value);

    if (inputDate <= currentDate) {
      return { expiredDate: true };
    }
    return null;
  }

  validateEmptySpace(control: FormControl) {
    const value = control.value;
    if (value) {
      const trimmedValue = value.trim();

      if (trimmedValue === '') {
        return { emptySpace: true };
      }
    }
    return null;
  }

  validateNumber(control: FormControl) {
    const inputValue = control.value;
    const isNumeric = /^-?\d+$/.test(inputValue);
    if (!isNumeric) {
      return { notNumber: true };
    }
    return null;
  }

  addCoupon() {
    this.openModal();
    this.modalButton = 'Add Coupon';
  }
  openModal() {
    this.openModalValue = true;
  }

  onCloseModal() {
    if (this.couponForm) {
      this.couponForm.reset();
    }
  }

  submitCouponForm() {
    const couponData = this.couponForm.getRawValue();

    if (this.isEditCoupon) {
      this._couponService.updateCoupon(this.couponId, couponData).subscribe({
        next: (course) => {
          this._toastr.success('Coupon Updated');
          this.getCouponData();
          this.openModalValue = false;
        },
      });
    } else {
      this._couponService.addNewCoupon(couponData).subscribe({
        next: (coupon) => {
          this._toastr.success('Coupon added successfully');
          this.getCouponData();
          this.openModalValue = false;
        },
      });
    }
  }

  getCouponData() {
    this._couponService.getAllCoupons().subscribe({
      next: (data) => {
        this.couponDatas = data;
        console.log(this.couponDatas);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editCoupon(coupon: ICoupon) {
    this.modalButton = 'Update Coupon';
    this.openModal();
    this.setCouponFormValue(coupon);
    this.isEditCoupon = true;
    this.couponId = coupon._id;
  }

  setCouponFormValue(coupon: ICoupon) {
    const couponExpiredDate = new Date(coupon.expiredDate);
    const day = couponExpiredDate.getDate().toString().padStart(2, '0');
    const month = (couponExpiredDate.getMonth() + 1)
      .toString()
      .padStart(2, '0'); // Month is zero-based
    const year = couponExpiredDate.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);

    this.couponForm.patchValue({
      couponCode: coupon.couponCode,
      discountType: coupon.discountType,
      discountAmount: coupon.discountAmount,
      maxDiscountAmount: coupon.maxDiscountAmount,
      minPurchaseAmount: coupon.minPurchaseAmount,
      expiredDate: formattedDate,
    });
  }

  unlistCoupon(couponId: string) {
    this._confirmService
      .confirmModal({
        title: 'Please confirm action',
        message: 'Are you sure want to unlist the coupon!',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
      })
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this._couponService.unlistCoupon(couponId).subscribe({
            next: (res) => {
              this._toastr.success('Coupon unlisted');
              this.getCouponData();
            },
            error: (error) => {
              this._toastr.error('coupon listing failed');
              console.log(error);
            },
          });
        }
      });
  }

  listCoupon(couponId: string) {
    this._confirmService
      .confirmModal({
        title: 'Please confirm action',
        message: 'Are you sure want to list the coupon!',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
      })
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this._couponService.listCoupon(couponId).subscribe({
            next: (res) => {
              this._toastr.success('Coupon listed');
              this.getCouponData();
            },
            error: (error) => {
              this._toastr.error('coupon unlisting failed');
              console.log(error);
            },
          });
        }
      });
  }
}
