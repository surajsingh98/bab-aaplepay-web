import { Component } from '@angular/core';

declare global {
  interface Window {
    ApplePaySession:any;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bab-applepay-web';

  ngOnInit() {
    
    this.loadScriptByUrl(
      'https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js',
      function (scriptref:any, id: any) {
        if (window.ApplePaySession) {
          // The Apple Pay JS API is available.
          console.log("apple pay is available")
        } else {
          console.log("apple pay is not available")
        }
      }
    );
  }

  loadScriptByUrl(url: any, afterload:any) {
    let dynamicScript = document.createElement('script');
    dynamicScript.type = 'text/javascript';
    dynamicScript.async = true;
    dynamicScript.src = url;
    document.body.appendChild(dynamicScript);

    dynamicScript.addEventListener('load', () => {
      afterload(dynamicScript, dynamicScript.id);
    });
  }

  // onApplePayButtonClicked() {

  //   // Consider falling back to Apple Pay JS if Payment Request is not available.
  //   if (!PaymentRequest) {
  //     return;
  //   }

  //   try {

  //     // Define PaymentMethodData
  //     const paymentMethodData = [{
  //       "supportedMethods": "https://apple.com/apple-pay",
  //       "data": {
  //         "version": 3,
  //         "merchantIdentifier": "merchant.com.apdemo",
  //         "merchantCapabilities": [
  //           "supports3DS"
  //         ],
  //         "supportedNetworks": [
  //           "amex",
  //           "discover",
  //           "masterCard",
  //           "visa"
  //         ],
  //         "countryCode": "US"
  //       }
  //     }];
  //     // Define PaymentDetails
  //     const paymentDetails = {
  //       "total": {
  //         "label": "My Merchant",
  //         "amount": {
  //           "value": "27.50",
  //           "currency": "USD"
  //         }
  //       }
  //     };
  //     // Define PaymentOptions
  //     const paymentOptions = {
  //       "requestPayerName": false,
  //       "requestBillingAddress": false,
  //       "requestPayerEmail": false,
  //       "requestPayerPhone": false,
  //       "requestShipping": true,
  //       "shippingType": "shipping"
  //     };

  //     // Create PaymentRequest
  //     const request = new PaymentRequest(paymentMethodData, paymentDetails, paymentOptions);

  //     request.onmerchantvalidation = event => {
  //       // Call your own server to request a new merchant session.
  //       const merchantSessionPromise = validateMerchant();
  //       event.complete(merchantSessionPromise);
  //     };

  //     request.onpaymentmethodchange = event => {
  //       if (event.methodDetails.type !== undefined) {
  //         // Define PaymentDetailsUpdate based on the selected payment method.
  //         // No updates or errors needed, pass an object with the same total.
  //         const paymentDetailsUpdate = {
  //           'total': paymentDetails.total
  //         };
  //         event.updateWith(paymentDetailsUpdate);
  //       } else if (event.methodDetails.couponCode !== undefined) {
  //         // Define PaymentDetailsUpdate based on the coupon code.
  //         const total = calculateTotal(event.methodDetails.couponCode);
  //         const displayItems = calculateDisplayItem(event.methodDetails.couponCode);
  //         const shippingOptions = calculateShippingOptions(event.methodDetails.couponCode);
  //         const error = calculateError(event.methodDetails.couponCode);

  //         event.updateWith({
  //           total: total,
  //           displayItems: displayItems,
  //           shippingOptions: shippingOptions,
  //           modifiers: [
  //             {
  //               data: {
  //                 additionalShippingMethods: shippingOptions,
  //               },
  //             },
  //           ],
  //           error: error,
  //         });
  //       }
  //     };

  //     request.onshippingoptionchange = event => {
  //       // Define PaymentDetailsUpdate based on the selected shipping option.
  //       // No updates or errors needed, pass an object with the same total.
  //       const paymentDetailsUpdate = {
  //         'total': paymentDetails.total
  //       };
  //       event.updateWith(paymentDetailsUpdate);
  //     };

  //     request.onshippingaddresschange = event => {
  //       // Define PaymentDetailsUpdate based on a shipping address change.
  //       const paymentDetailsUpdate = {
  //         "total": {
  //           "label": "My Merchant",
  //           "amount": {
  //             "value": "27.50",
  //             "currency": "USD"
  //           }
  //         }
  //       };
  //       event.updateWith(paymentDetailsUpdate);
  //     };

  //     const response = await request.show();
  //     const status = "success";
  //     await response.complete(status);
  //   } catch (e) {
  //     // Handle errors
  //   }
  // }
}
