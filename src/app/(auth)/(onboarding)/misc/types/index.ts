export interface AuthData {
  user: User;
  today: string;
  staffPerformance: StaffPerformance;
  downloads: Downloads;
  target: Target;
}
export interface User {
  name: string;
  email: string;
  user_data: string | undefined;
  bvn_first_name: string;
}

export interface UserEntities {
  message: string;
  user_data: UserData;
  accounts_data: AccountsDaum[];
  wallets_data: WalletsDaum[];
}

export interface UserData {
  id: number;
  last_login: string;
  is_active: boolean;
  date_joined: string;
  tag: string;
  first_name: string;
  last_name: string;
  username: string;
  phone_number: string;
  email: string;
  customer_id: string;
  unique_id: string;
  terminal_id: string;
  terminal_serial: string;
  terminal_provider: string;
  date_assigned: string;
  custom_account_provider: string;
  type_of_user: string;
  registration_email_verified: boolean;
  referral_code: string;
  referer_code: string;
  state: string;
  lga: string;
  nearest_landmark: string;
  street: string;
  has_login_pin: boolean;
  merchant_pin: string;
  has_transaction_pin: boolean;
  has_merchant_pin: boolean;
  pin_retries: number;
  pin_remaining_retries: number;
  kyc_one_image_url: string;
  kyc_two_image_url: string;
  kyc_level: number;
  kyc_one_progress: string;
  kyc_two_progress: string;
  kyc_three_progress: string;
  email_subscription: boolean;
  sms_subscription: boolean;
  send_money_status: boolean;
  block_on_funding: boolean;
  bypass_duplicate_trans: boolean;
  bvn_number: string;
  bvn_first_name: string;
  bvn_last_name: string;
  first_security_question: string;
  first_security_answer: string;
  second_security_question: string;
  second_security_answer: string;
  sales_rep_upline_code: string;
  sales_rep_full_name: string;
  initial_handler: string;
  has_sales_rep: boolean;
  business_name: string;
  gender: string;
  sales_rep_comm_balance_daily: number;
  sales_rep_comm_balance: number;
  bills_pay_comm_balance_daily: number;
  bills_pay_comm_balance: number;
  other_comm_balance_daily: number;
  other_comm_balance: number;
  firebase_key: string;
  notify_app_token: string;
  login_count: number;
  terminal_login_count: number;
  mobile_login_count: number;
  web_login_count: number;
  daily_terminal_login_count: number;
  weekly_terminal_login_count: number;
  monthly_terminal_login_count: number;
  terminal_last_login: string;
  mobile_last_login: string;
  web_last_login: string;
  is_suspended: boolean;
  terminal_suspended: boolean;
  mobile_suspended: boolean;
  terminal_disabled: boolean;
  mobile_disabled: boolean;
  terminal_disable_count_sum: number;
  mobile_disable_count_sum: number;
  terminal_disable_count: number;
  mobile_disable_count: number;
  role: string;
  agent_consent: boolean;
  date_of_consent: string;
  marital_status: string;
  vfd_bvn_acct_num_count: number;
  terminal_status: string;
  terminal_truly_active: boolean;
  inactive_count: number;
  terminal_last_inactive: string;
  lotto_win_toggle: boolean;
  added_trans_limit: number;
}

export interface AccountsDaum {
  account_type: string;
  bank_name: string;
  account_number: string;
  account_name: string;
}

export interface WalletsDaum {
  wallet_type: string;
  available_balance: number;
  lotto_balance: number;
}

export interface CustomerCount {
  all_customers: number;
  new_customers: number;
  active_customers: number;
  Inactive_customers: number;
  churn_customers: number;
  customer_changes: CustomerChanges;
}

export interface CustomerChanges {
  all_customers: AllCustomersChanges;
  new_customers: NewCustomersChanges;
  active_customers: ActiveCustomersChanges;
  inactive_customers: InactiveCustomersChanges;
  churn_customers: ChurnCustomersChanges;
}

export interface AllCustomersChanges {
  percentage: string | undefined;
  change: string;
}

export interface NewCustomersChanges {
  percentage: string | undefined;
  change: string;
}

export interface ActiveCustomersChanges {
  percentage: string | undefined;
  change: string;
}

export interface InactiveCustomersChanges {
  percentage: string | undefined;
  change: string;
}

export interface ChurnCustomersChanges {
  percentage: string | undefined;
  change: string;
}

export interface StaffPerformance {
  labels: string[];
  values: Record<string, number[]>;
}

export interface Downloads {
  total: number;
  completeSignups: number;
  incompleteSignups: number;
}
export interface Target {
  complete: number;
  required: number;
}

export type AuthState = {
  isAuthenticated: boolean;
  user: UserDataTypes | null;
  isLoading: boolean;
};

export type AuthAction =
  | { type: "LOGIN"; payload: UserDataTypes }
  | { type: "LOGOUT" }
  | { type: "STOP_LOADING" };

export type AuthDispatch = React.Dispatch<AuthAction> | null;

export type LoginDto = {
  phone_number: string;
  password: string;
};

export type LoginOtpDto = {
  phone_number: string;
  otp: string;
  referal_code: string | null;
};



export interface UserDataTypes {
  user_id:string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  email_verified: string;
  phone_number: string;
  phone_verified: boolean;
  address: string;
  gender: string;
  organization: string;
  date_of_birth: string;
  state: string;
  due_date: string;
  wema_account_details: string;
  account_number: string;
  has_set_password: boolean;
  bvn: string;
  bvn_verified: string;
  nin: string;
  nin_verified: string;
  hospitals: Hospitals;
  exists_on_loandisk: string;
  loandisk_borrower_id: string;
  is_remita: boolean;
  is_active: boolean;
  is_staff: string;
}

interface Hospitals {
  lga: string;
  state: string;
  hospital: string;
  provider_id: string;
}