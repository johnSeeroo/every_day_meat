import { environment } from '../../../../environments/environment';

export const WebAPI = {
  getCategoryList(): string {
    return `${environment.apiUrl}list_of_categories`;
  },

  setHomePage(): string {
    return `${environment.apiUrl}list_of_homepage`;
  },

  checkAvailability(): string {
    return `${environment.apiUrl}check_availibility`;
  },

  getMobileUserOTP(): string {
    return `${environment.apiUrl}user_login_mobile`;
  },
  
  emailUserOTPVerification(): string {
    return `${environment.apiUrl}user_otp_verification`;
  },

  userEmailLogin(): string {
    return `${environment.apiUrl}user_email_login`;
  },

  addDeliveryLocation(): string {
    return `${environment.apiUrl}pincode-request`;
  },

  getProductsByCategory(): string {
    return `${environment.apiUrl}search_product_categ_page`;
  },

  getProductDetailsById(): string {
    return `${environment.apiUrl}list_of_single_products`;
  },

  userLoginOTPVerify(): string {
    return `${environment.apiUrl}user_otp_login_verify`;
  },

  userAddProductToCart(): string {
    return `${environment.apiUrl}uom/add_product_cart_float`;
  },

  publicAddProductToCart(): string {
    return `${environment.apiUrl}uom/add_product_cart_float_public`;
  },

  userUpdateProductCart(): string {
    return `${environment.apiUrl}uom/update_product_cart_float`;
  },

  publicUpdateProductCart(): string {
    return `${environment.apiUrl}uom/update_product_cart_float_public`;
  },
  
  userViewCart(): string {
    return `${environment.apiUrl}uom/view_cart_data`;
  },

  publicViewCart(): string {
    return `${environment.apiUrl}uom/view_cart_data_public`;
  },

  userRemoveItemFromCart(): string {
    return `${environment.apiUrl}remove_product_cart_float_uom`;
  },

  publicRemoveItemFromCart(): string {
    return `${environment.apiUrl}remove_product_cart_float_uom_public`;
  },

  viewUserProfile(): string {
    return `${environment.apiUrl}view_user_profile`;
  },

  editUserProfile(): string {
    return `${environment.apiUrl}edit_user_profile`;
  },

  notifyOnAvailability(): string {
    return `${environment.apiUrl}notify-on-availability`;
  },

  updatePassword(): string {
    return `${environment.apiUrl}update_user_password`;
  },

  viewAddress(): string {
    return `${environment.apiUrl}view_shipping_address`;
  },

  updateAddress(): string {
    return `${environment.apiUrl}update_shipping_address`;
  },

  aboutUs(): string {
    return `${environment.apiUrl}company_about_us`;
  },

  contactDetails(): string {
    return `${environment.apiUrl}company_contact_details`;
  },

  searchProductPage(): string {
    return `${environment.apiUrl}search_product_page`;
  },

  viewOrderHistory(): string {
    return `${environment.apiUrl}view_order_history`;
  },

  viewIndividualOrderHistory(): string {
    return `${environment.apiUrl}view_individual_history_uom`;
  },

  addTimeSlot(): string {
    return `${environment.apiUrl}add_time_slot`;
  },

  cashOnDeliveryCheckOut(): string {
    return `${environment.apiUrl}cart_checkout`;
  },

  razorPayCheckOut(): string {
    return `${environment.apiUrl}initiate-razor-pay-order`;
  },

  userRegister(): string {
    return `${environment.apiUrl}user_registration`;
  },

  finalCartForCheckOut(): string {
    return `${environment.apiUrl}uom/final_cart_data`;
  },

  publicLoginOTPVerify(): string {
    return `${environment.apiUrl}user_otp_login_verify_public`;
  },

  getOfferList(): string {
    return `${environment.apiUrl}view_offers`;
  },

  applyOffer(): string {
    return `${environment.apiUrl}apply_gift_coupon_uom`;
  },

  removeOffer(): string {
    return `${environment.apiUrl}remove_gift_coupon_uom`;
  },

  cancelOrder(): string {
    return `${environment.apiUrl}cancel_order`;
  },

  rateProduct(): string {
    return `${environment.apiUrl}order_feedback`;
  },

  paymentStatus(): string {
    return `${environment.apiUrl}get-payment-status`;
  },

};
