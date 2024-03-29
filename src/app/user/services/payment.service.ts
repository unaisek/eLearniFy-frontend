import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stripe } from '@stripe/stripe-js';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { IEnrolledCourse } from 'src/app/models/IEnrolledCourse';

export interface IPaymentData{
  email?:string;
  paymentMethod?:string
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  stripePromise: Promise<Stripe>;

  constructor(private _http: HttpClient) {
    this.stripePromise = this.loadStripe();
  }

  private loadStripe(): Promise<Stripe> {
    return new Promise((resolve, reject) => {
      if ((window as any).Stripe) {
        resolve((window as any).Stripe(env.stripeKey));
      } else {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://js.stripe.com/v3/';
        script.onload = () => {
          resolve((window as any).Stripe(env.stripeKey));
        };
        document.head.appendChild(script);
      }
    });
  }

  makePayment(courseId: string, couponId:string, paymentData:IPaymentData ): Observable<string | IEnrolledCourse> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const userId = localStorage.getItem('user')
    const body = { courseId,userId, couponId, paymentData }; 
    return this._http.post<string | IEnrolledCourse>(
      `${env.apiUrl}/user/create-checkout-session`,
      body
    );
  }

  async initiateStripeCheckout(session: string): Promise<boolean> {
    try {
      const stripe = await this.stripePromise;
      // const session = await this.makePayment(courseId).toPromise();

      const result = await stripe.redirectToCheckout({
        sessionId:session
      });
      

      if (result.error) {
        console.error(result.error);
        return false
      } 
      return true;
    } catch (error) {
      console.error(error);
      return false
    }
  }
}
