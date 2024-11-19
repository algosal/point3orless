export interface Order {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  price: number;
  shipping_company: string;
  tracking_number: string;
  payment_confirmation: string;
  receipt_url: string;
  status: string;
  created_at: string;
}
