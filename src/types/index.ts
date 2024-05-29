import { ReactElement, ReactNode } from 'react';

import type { NextPage } from 'next';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type ToastNotification = 'success' | 'error' | 'neutral';

export interface Root {
  dashData: GenericObject;
}

type GenericObject = { [key: string]: unknown };

export interface DashData {
  wallets: Wallets;
  terminals: Terminals;
  transactionCount: TransactionCount;
  totalTransactions: TotalTransactions;
  sales: SalesOrUsersOrCommInOrCommOut;
  users: SalesOrUsersOrCommInOrCommOut;
  commIn: SalesOrUsersOrCommInOrCommOut;
  commOut: SalesOrUsersOrCommInOrCommOut;
  kytSuccessRate: KytSuccessRate;
  totalUsersComplete: SingleDashChartData;
  totalTerminalsComplete: SingleDashChartData;
  activeAndInactiveTerminals: MultipleDashLineChartData;
  totalTransactionsComplete: SingleDashChartData;
  totalCommissionComplete: SingleDashChartData;
  totalCommissionBar: SingleDashChartData;
}

export interface Wallets {
  overall: number;
  pos: number;
  mobile: number;
}

export interface Terminals {
  total: number;
  active: number;
  inactive: number;
}

export interface TransactionCount {
  total: number;
  pos: number;
  mobile: number;
}

export interface TotalTransactions {
  total: number;
  terminal: number;
  mobile: number;
}

export interface SalesOrUsersOrCommInOrCommOut {
  total: number;
  percentage: number;
  change: string;
}

export interface KytSuccessRate {
  completion: number;
  totalUsers: number;
  completed: number;
  incomplete: number;
}

export interface SingleDashChartData {
  labels: string[];
  values?: number[] | null;
  total: number;
  percentage: string | number;
  change: string;
}

export interface SingleDashSalesChartData {
  labels: string[];
  values?: number[] | null;
  total: number;
  percentage: string | number;
  change: string;
  month_target: number;
  sold_terminals: number;
}

export interface MultipleDashLineChartData {
  labels: string[];
  values?: MultipleValuesEntity[] | null;
  total: number;
  percentage: string;
  change: string;
}

export interface MultipleValuesEntity {
  label: string;
  data?: number[] | null;
}

export interface RightBarDay {
  id: number;
  name: string;
  unavailable: boolean;
}

export type TransactionDataEntity = {
  id: number;
  amount: number;
  reference: string;
  event: string;
  paid_at: string;
  created_at: string;
  received_at: string;
  channel: string;
  currency: string;
  reason?: null;
  mobile: boolean;
  bank: string;
  card_type: string;
  gateway_response: string;
  device_provider: string;
  cash_balance: number;
  user: number;
};

export interface PaymentsData {
  account_name: string;
  account_number: string;
  amount: string;
  bank_code: string;
  bank_name: string;
  firstname: string;
  id: number;
  lastname: string;
  processed: boolean;
  good_data: string;
  total_amount: string;
  total_recipients: string;
  bulk_id: string;
  request_type: string;
  buddy_phone_number: string;
  send_money_data: SendMoneyDataEntity[];
}

export interface SendMoneyDataEntity {
  amount: number;
  bank_code: string;
  bank_name: string;
  narration: string;
  account_name: string;
  is_recurring: boolean;
  account_number: string;
  is_beneficiary: boolean;
  commission_type: string;
  save_beneficiary: boolean;
  ledger_commission: number;
  remove_beneficiary: boolean;
}

export interface AllCustomersData {
  count: number;
  next: unknown;
  previous: unknown;
  results: AllCustomersEntity[];
}
export interface AllCustomersEntity {
  id: number;
  kyc_level: number;
  last_login?: string;
  is_active: boolean;
  date_joined: string;
  tag: string;
  first_name: string;
  last_name: string;
  username: string;
  phone_number: string;
  email: string;
  customer_id: string;
  terminal_id: unknown;
  type_of_user: string;
  registration_email_verified: boolean;
  referral_code: unknown;
  state?: string;
  lga?: string;
  nearest_landmark?: string;
  street?: string;
  has_login_pin: boolean;
  has_transaction_pin: boolean;
  pin_retries: number;
  pin_remaining_retries: number;
  kyc_one_image_url: unknown;
  kyc_two_image_url: unknown;
  sms_subscription: boolean;
  send_money_status: boolean;
  sales_rep_upline_code: unknown;
  firebase_key: string;
  is_suspended: boolean;
}

export interface CustomerData {
  customers: CustomerDataEntity[];
  count: number;
}

export interface CustomerDataEntity {
  id: number;
  unique_id: string;
  last_login?: string;
  date_joined: string;
  tag: string;
  name: string;
  email: string;
  kyc_level: string;
  device: string;
}

export interface ActiveCustomerData {
  active_customers: ActiveCustomerDataEntity[];
  count: number;
}

export interface ActiveCustomerDataEntity {
  id: number;
  unique_id: string;
  last_login: string;
  date_joined: string;
  name: string;
  email: string;
  kyc_level: string;
  device: string;
}

export interface NewCustomerData {
  new_customers: NewCustomerDataEntity[];
  count: number;
}

export interface NewCustomerDataEntity {
  id: number;
  unique_id: string;
  last_login?: string;
  date_joined: string;
  name: string;
  email: string;
  kyc_level: string;
  device: string;
}

export interface ChurnCustomerData {
  churn_customers: ChurnCustomerDataEntity[];
  count: number;
}

export interface ChurnCustomerDataEntity {
  id: number;
  unique_id: string;
  last_login: string;
  date_joined: string;
  name: string;
  email: string;
  kyc_level: string;
  device: string;
}

export interface InActiveCustomerData {
  active_customers: InActiveCustomerDataEntity[];
  count: number;
}

export interface InActiveCustomerDataEntity {
  id: number;
  unique_id: string;
  last_login: string;
  date_joined: string;
  name: string;
  email: string;
  kyc_level: string;
  device: string;
}

export interface SuspendedCustomerData {
  suspended_customers: SuspendedCustomerDataEntity[];
  count: number;
}

export interface SuspendedCustomerDataEntity {
  id: number;
  unique_id: string;
  last_login: string;
  date_joined: string;
  name: string;
  email: string;
  kyc_level: string;
  device: string;
}

export interface IncompleteCustomerRegisData {
  incomplete_customers: IncompleteCustomerRegisDataEntity[];
  count: number;
}

export interface IncompleteCustomerRegisDataEntity {
  id: number;
  unique_id: string;
  last_login: string;
  date_joined: string;
  name: string;
  email: string;
  kyc_level: string;
  device: string;
}

export interface IncompleteCustomerKycData {
  incomplete_customers: IncompleteCustomerKycDataEntity[];
  count: number;
}

export interface IncompleteCustomerKycDataEntity {
  id: number;
  unique_id: string;
  last_login?: string;
  date_joined: string;
  name: string;
  email: string;
  kyc_level: string;
  device: string;
}

export interface CustomerTransactionData {
  transactions: CustomerTransactionEntity[];
  count: number;
}

export interface CustomerTransactionEntity {
  id: number;
  amount: number;
  transaction_mode: string;
  transaction_type: string;
  liberty_reference: string;
  transaction_id: string;
  date_created: string;
  beneficiary_nuban: string;
  status: string;
}

export interface AgentDetailData {
  agent_details: AgentDetailEntity[];
  count: number;
}

export interface AgentDetailEntity {
  id: number;
  terminal_id: string;
  name: string;
  status: string;
  email: string;
  date_joined: string;
  average_transaction_per_day: number;
  transaction_count: number;
  total_transaction?: number;
}
export interface AgentSpecificData {
  agent_details: AgentSpecificDetailsEntity;
  general: General;
}

export interface AgentSpecificDetailsEntity {
  id: number;
  terminal_id: string;
  name: string;
  username: string;
  email: string;
  agent_id: string;
  phone_number: string;
  status: string;
  date_joined: string;
  last_login: string;
  transaction_counts: number;
  Address: Address;
  gender: string;
  marital_status: string;
  bvn: string;
  AccountDetails: AccountDetails;
  kyc_status_percentage: string;
  agent_salesrep: string;
}

export interface Address {
  state: string;
  city: string;
  lga: string;
  street: string;
}

export interface AccountDetails {
  bank_name: string;
  account_number: string;
}

export interface General {
  Wallets: number;
  bills_utilities_commission: number;
}

export interface AgentTransactionDetailsData {
  agent_details: AgentDetailsTransactionEntity;
  transactions_list: AgentTransactionsList[];
  count: number;
}

export interface AgentDetailsTransactionEntity {
  agentDetails: AgentDetails2;
}

export interface AgentDetails2 {
  id: number;
  username: string;
  agent_id: string;
  phone_number: string;
  terminal_id: string;
  name: string;
  email: string;
  date_joined: string;
  last_login: string;
}

export interface AgentTransactionsList {
  id: number;
  description: string;
  amount: number;
  transaction_method?: string;
  reference_id: string;
  date_time: string;
  receiver?: string;
  status: string;
}

export interface AgentLogData {
  agent_logs: AgentLogEntity[];
  count: number;
}

export interface AgentLogEntity {
  id: number;
  log_time: string;
  session_duration: string;
  device: string;
  location: string;
}

export interface AgentDisputeData {
  agent_disputes: AgentDisputeEntity[];
  count: number;
}

export interface AgentDisputeEntity {
  id: number;
  pAN: string;
  narration: string;
  dispute_type: string;
  card_first_six_digits: string;
  card_last_four_digits: string;
  receiver_account_number: string;
  customer_mobile_number: string;
  customer_account_number: string;
  customer_name: string;
  transaction_rrn: string;
  transaction_date: string;
  issue: string;
  stan: string;
  requested_amount: number;
  dispensed_amount: number;
  terminal_id: string;
  respond_time: string;
  resolved_by: string;
  status: string;
}

export interface DisputBranchUploadData {
  batch_uploads: DisputesBranchUploadEntity[];
  count: number;
}

export interface DisputesBranchUploadEntity {
  id: number;
  date: string;
  disputes_list: DisputesBranchUploadList[];
}

export interface DisputesBranchUploadList {
  Pan: string;
  Stan: string;
  TerminalId: string;
  DispenseType: string;
  TransactionDate: string;
  RetrievalReferenceNumber: string;
  LogComments: string;
  RequestedAmount: number;
  DispensedAmount: number;
  Status: string;
}

export interface AgentDetailsKycData {
  agent_details: AgentDetailsKycEntity;
}

export interface AgentDetailsKycEntity {
  id: number;
  personal_info: PersonalInfo;
  transaction_counts: number;
  next_of_kin: NextOfKin;
  guarantor_information: GuarantorInformation;
}

export interface PersonalInfo {
  username: string;
  firstname: string;
  lastname: string;
  phone_number: string;
  email: string;
  marital_status: string;
  date_of_birth: string;
  address: string;
  state: string;
  lga: string;
  agent_id: string;
  last_login: string;
  terminal_id: string;
  status: string;
}

export interface NextOfKin {
  name: string;
  address: string;
  relationship: string;
}

export interface GuarantorInformation {
  name: string;
  address: string;
  phone_number: string;
  email: string;
  occupation: string;
  valid_identity_card: string;
}

export interface AgentsTerminalDetail {
  agents_details: AgentsTerminalDetailEntity[];
  count: number;
}

export interface AgentsTerminalDetailEntity {
  id: number;
  terminal_id: string;
  name: string;
  status: string;
  email: string;
  date_joined: string;
  last_login: string;
}

export interface InActiveAgentsTerminalDetail {
  inactive_agent: InActiveAgentsTerminalDetailEntity[];
  count: number;
}

export interface InActiveAgentsTerminalDetailEntity {
  id: number;
  terminal_id: string;
  name: string;
  status: string;
  email: string;
  date_joined: string;
  last_login: string;
}

export interface SuspendedTerminalData {
  suspended_terminals: SuspendedTerminalEntity[];
  count: number;
}

export interface SuspendedTerminalEntity {
  id: number;
  terminal_id: string;
  name: string;
  status: string;
  email: string;
  date_joined: string;
  last_login: string;
}

export interface DormantAgentsTerminalDetail {
  dormant_terminals: DormantAgentsTerminalDetailEntity[];
  count: number;
}

export interface DormantAgentsTerminalDetailEntity {
  id: number;
  terminal_id: string;
  name: string;
  status: string;
  email: string;
  date_joined: string;
  last_login: string;
}

export interface TerminalPerformanceData {
  terminals: TerminalPerformanceEntity[];
  count: number;
}

export interface TerminalPerformanceEntity {
  id: number;
  terminal_id: string;
  name: string;
  status: string;
  transaction_count: number;
  average_transaction_per_week?: number;
  last_login: string;
}

export interface DisputeOverviewData {
  resolved_disputes: number;
  need_response: number;
}

export interface DisputeData {
  data: DisputeDataEntity[];
  count: number;
}

export interface DisputeDataEntity {
  id: string;
  pAN: string;
  narration: string;
  dispute_type: string;
  card_first_six_digits: string;
  card_last_four_digits: string;
  receiver_account_number: string;
  customer_mobile_number: string;
  customer_account_number: string;
  customer_name: string;
  transaction_rrn: string;
  transaction_date: string;
  date_created: string;
  issue: string;
  stan: string;
  requested_amount: number;
  dispensed_amount: number;
  terminal_id: string;
  respond_time: string;
  resolved_by: string;
  status: string;
}

export interface StockHistoryData {
  count: number;
  next: unknown;
  previous: unknown;
  results: StockHistoryEntity[];
}

export interface StockHistoryEntity {
  id: number;
  action: string;
  admin: number;
  sales_repr: unknown;
  stock: number;
  batch_id: string;
  batch_date_created: string;
  status: string;
  date_created: string;
  approved_date: string;
  pick_up_date: string;
}

export interface DashTransactionData {
  transactionComparatives: TransactionComparatives;
  totalTransactionsAmount: TotalTransactionsAmount;
  totalTransactionsCount: TotalTransactionsCount;
  averageAgentTransactions: AverageAgentTransactions;
  averageWorkDays: AverageWorkDays;
  averageTransactionCountPerAgent: AverageTransactionCountPerAgent;
}

export interface TransactionComparatives {
  pos_withdrawals: number;
  send_money: number;
  pos_withdrawals_count: number;
  send_money_count: number;
  airtime: number;
  data: number;
  utilities: number;
}

export interface TotalTransactionsAmount {
  total: number;
  percentage: string;
  change: string;
}

export interface TotalTransactionsCount {
  total: number;
  percentage: string;
  change: string;
}

export interface AverageAgentTransactions {
  total: number;
  percentage: string;
  change: string;
}

export interface AverageWorkDays {
  total: number;
  percentage: string;
  change: string;
}

export interface AverageTransactionCountPerAgent {
  averageTransactionPerAgent: number;
  total: number;
  percentage: number;
  change: string;
}

export interface TransactionListData {
  transactions: TransactionListEntity[];
  count: number;
}

export interface TransactionListEntity {
  id: number;
  amount: number;
  transaction_mode?: string;
  transaction_id: string;
  date_created: string;
  beneficiary_nuban?: string;
  status: string;
  transaction_type: string;
}

export interface CommissionsListData {
  commissions_list: CommissionsListEntity[];
  count: number;
}

export interface CommissionsListEntity {
  id: number;
  amount: number;
  commission_in: number;
  commission_out: number;
  reference_id: string;
  date_time: string;
  status: string;
}

export interface LogHistoryData {
  logs: LogHistoryEntity[];
  count: number;
}

export interface LogHistoryEntity {
  id: number;
  user: string;
  role: string;
  name: string;
  status: string;
  device: string;
  date: string;
  last_session: string;
  last_session_duration: string;
  operation_type: string;
}

export interface LogHistoryDetailsData {
  overview: OverviewLogHistoryData;
  logs: LogHistoryDetailsEntity[];
  count: number;
}

export interface OverviewLogHistoryData {
  name: string;
  role: string;
}

export interface LogHistoryDetailsEntity {
  id: number;
  status: string;
  date: string;
  device: string;
  operation_type: string;
}

export interface ServiceQualityData {
  pos_withdrawal_success_rate: number;
  pos_withdrawal_ussd_success_rate: number;
  card_withdrawal_nfc_success_rate: number;
  sendmoney_success_rate: number;
  buy_airtime_success_rate: number;
  buy_data_success_rate: number;
  pay_bills_cable_tv: number;
  pay_bills_electricity: number;
}

export interface PosMerchantData {
  agent_details: PosMerchantEntity[];
  count: number;
}

export interface PosMerchantEntity {
  id: number;
  terminal_id: string;
  name: string;
  status: string;
  email: string;
  date_joined: string;
  average_transaction_per_day: number;
  transaction_count: number;
  total_transaction: number;
}

export interface RoleUsersData {
  data: RoleUsersEntity[];
  count: number;
}

export interface RoleUsersEntity {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  type_of_user: string;
  role: string;
  user_id: string;
  name: string;
  log_in: string;
  last_session?: string;
  status: string;
}

export interface UsersRoleData {
  data: UsersRoleDataEntity[];
  count: number;
}

export interface UsersRoleDataEntity {
  id: number;
  role_id: string;
  role: string;
  role_description: string;
  number_of_users: number;
  status: string;
}

export interface AuditTrailData {
  logs: AuditTrailEntity[];
  count: number;
}

export interface AuditTrailEntity {
  id: number;
  user: string;
  role: string;
  name: string;
  date: string;
  device: string;
  operation_type: string;
}

export interface ReceivedTerminalData {
  agents_details: ReceivedTerminalDetails[];
  count: number;
}

export interface ReceivedTerminalDetails {
  id: number;
  terminal_id: string;
  name: string;
  status: string;
  email: string;
  date_joined: string;
  last_login: string;
}

export interface ZonesListData {
  zones_list: ZonesListEntity[];
  count: number;
}

export interface ZonesListEntity {
  id: number;
  state: string;
  number_of_branches: number;
  number_of_terminals: number;
}

export interface ZoneStockDetailData {
  overview: ZoneStockDetailOverview;
  stock_list: ZoneStockDetailEntity[];
  count: number;
}

export interface ZoneStockDetailOverview {
  state: string;
  number_of_branches: number;
  terminal_in_stock: number;
}

export interface ZoneStockDetailEntity {
  id: number;
  provider: string;
  serial_number: string;
  model_number: string;
  terminal_id: string;
  stock_location: string;
  payment_status: string;
  is_assigned: string;
}

export interface ZoneBranchListData {
  overview: ZoneBranchListOverview;
  branch_list: ZoneBranchListEntity[];
  count: number;
}

export interface ZoneBranchListOverview {
  state: string;
  number_of_branches: number;
  terminal_in_stock: number;
}

export interface ZoneBranchListEntity {
  id: number;
  branch: string;
  number_of_terminals: number;
  number_of_sales_reps: number;
}

export interface ZoneTrailListData {
  overview: ZoneTrailListOverview;
  terminal_details: ZoneTrailListEntity[];
  count: number;
}

export interface ZoneTrailListOverview {
  state: string;
  branch: string;
  terminals_in_stock: number;
}

export interface ZoneTrailListEntity {
  id: number;
  provider: string;
  number_of_terminals: number;
  status: string;
}

export interface ReassignTerminalDto {
  branch: string;
  terminal_id: string;
  zone: string;
}

export interface DeliveryRequestsListData {
  requests_list: DeliveryRequestsListEntity[];
  count: number;
}

export interface DeliveryRequestsListEntity {
  id: number;
  zone: string;
  number_of_devices: number;
  last_updated: string;
}

export interface DeliveryRequestsDetailsData {
  overview: DeliveryRequestsDetailsOverview;
  requests_list: DeliveryRequestsDetailsEntity[];
  count: number;
}

export interface DeliveryRequestsDetailsOverview {
  state: string;
  number_of_terminals: number;
}

export interface DeliveryRequestsDetailsEntity {
  id: number;
  provider: string;
  serial_number: string;
  model_number: string;
  payment_status: string;
  action: string;
  status: string;
}

export interface StockInData {
  requests_list: StockInRequestsEntity[];
  count: number;
}

export interface StockInRequestsEntity {
  id: number;
  zone: string;
  number_of_devices: number;
  last_updated: string;
}

export interface StockInRequestDetailData {
  request_details: StockInRequestDetailEntity;
  requested_devices: StockInRequestDetailRequestedDevices;
  analytics: StockInRequestDetailAnalytics;
  branch_details: StockInRequestBranchList[];
  count: number;
}

export interface StockInRequestDetailEntity {
  requested_by: string;
  number_of_branches: number;
  date: string;
}

export interface StockInRequestDetailRequestedDevices {
  libertypay: string;
  '9nairapoint': string;
  npsb: string;
  paydia: string;
  horizonpay: string;
}

export interface StockInRequestDetailAnalytics {
  assigned_terminal_ids: number;
  pickedup_terminal_ids: number;
  sold_terminals: number;
  active_terminals: number;
  inactive_terminals: number;
  suspended_terminals: number;
}

export interface StockInRequestBranchList {
  id: number;
  branch: string;
  number_of_terminals: string;
  approved_devices: number;
  request_time: string;
}

export interface StockInRequestBranchData {
  request_details: StockInRequestBranchDetails;
  requested_devices: StockInRequestBranchDevices;
  analytics: StockInRequestBranchAnalytics;
}

export interface StockInRequestBranchDetails {
  requested_by: string;
  date: string;
  note: string;
}

export interface StockInRequestBranchDevices {
  libertypay: string;
  '9nairapoint': string;
  npsb: string;
  paydia: string;
  horizonpay: string;
}

export interface StockInRequestBranchAnalytics {
  assigned_terminal_ids: number;
  pickedup_terminal_ids: number;
  sold_terminals: number;
  active_terminals: number;
  inactive_terminals: number;
  suspended_terminals: number;
}

export interface StockRequestApprovalDto {
  liberty_pay_plus: number;
  hoirzon_pay: number;
  nairapoint: number;
  npsb: number;
  paydia: number;
}
export interface StockRequestRejectDto {
  disapproval_note: string;
}

export interface StockRequestHistoryData {
  overview: Overview;
  stocks: StockRequestHistoryEntity[];
  count: number;
}

export interface Overview {
  number_of_zones: number;
  total_requests: number;
}

export interface StockRequestHistoryEntity {
  id: number;
  zone: string;
  number_of_terminals: number;
  number_of_salesrep: number;
  last_updated: string;
}

export interface StockRequestHistoryDetailsData {
  overview: StockRequestHistoryDetailsOverview;
  stocks: StockRequestHistoryDetailsEntity[];
  count: number;
}

export interface StockRequestHistoryDetailsOverview {
  zone: string;
  total_requests: number;
}

export interface StockRequestHistoryDetailsEntity {
  id: number;
  branch: string;
  number_of_terminals: number;
  number_of_salesrep: number;
  last_updated: string;
}

export interface HistoryListData {
  history_list: HistoryListEntity[];
  count: number;
}

export interface HistoryListEntity {
  sn: number;
  id: number;
  date_created: string;
  action_done: string;
  action_by: string;
  zone: string;
  report: string;
}

export interface ProvidersListData {
  overview: ProvidersListOverview;
  providers: ProvidersListEntity[];
  count: number;
}

export interface ProvidersListOverview {
  total_terminals: number;
  number_of_providers: number;
}

export interface ProvidersListEntity {
  id: number;
  device_name: string;
  number_of_terminals: number;
  available_terminals: number;
  last_updated: string;
}

export interface ProvidersDetailsData {
  overview: ProvidersDetailsOverview;
  terminal_details: ProvidersDetailsEntity[];
  count: number;
}

export interface ProvidersDetailsOverview {
  device_name: string;
  total_terminals: number;
  available_stock: number;
}

export interface ProvidersDetailsEntity {
  id: number;
  device_name: string;
  serial_number: string;
  model_number: string;
  terminal_id: string;
  stock_location: string;
  payment_status: string;
  is_assigned: boolean;
  zone: number;
  branch: string;
  comment: string;
}

export interface ProvidersHistoryDetailsData {
  stocks: ProvidersHistoryDetailsEntity[];
  count: number;
}

export interface ProvidersHistoryDetailsEntity {
  id: number;
  device_name: string;
  branch: string;
  last_updated: string;
  number_of_terminals: number;
}

export interface ProvidersBranchHistoryData {
  stocks: ProvidersBranchHistoryEntity[];
  count: number;
}

export interface ProvidersBranchHistoryEntity {
  's/n': number;
  id: number;
  branch: string;
  date_added: string;
  serial_number: string;
  terminal_id: string;
  model_number: string;
}

export interface RequestHistoryDetailsData {
  overview: RequestHistoryDetailsOverview;
  stocks: RequestHistoryDetailsStock[];
  count: number;
}

export interface RequestHistoryDetailsOverview {
  number_of_zones: number;
  total_requests: number;
}

export interface RequestHistoryDetailsStock {
  id: number;
  zone: string;
  number_of_terminals: number;
  number_of_salesrep: number;
  last_updated: string;
}

export interface AllTerminalTrailData {
  terminal_details: AllTerminalTrailEntity[];
  count: number;
}

export interface AllTerminalTrailEntity {
  id: number;
  provider: string;
  serial_number: string;
  model_number: string;
  number_of_terminals: number;
  status: string;
}

export interface TerminalTrailDetailData {
  overview: TerminalTrailDetailOverview;
  trail: TerminalTrailDetailTrails;
  branch_trail: TerminalTrailDetailBranchTrail[];
  terminal_details_table: TerminalTrailDetailTable;
}

export interface TerminalTrailDetailOverview {
  delivery_to: string;
  number_of_branches: number;
  start_date: string;
  number_of_terminals: number;
}

export interface TerminalTrailDetailTrails {
  head_office: string;
  in_transit: string;
  zone: string;
}

export interface TerminalTrailDetailBranchTrail {
  branch_name: string;
  terminals_received_at_branch: string;
  received_time: string;
  terminals_with_ro: string;
  terminals_with_agent: string;
}

export interface TerminalTrailDetailTable {
  table: TerminalTrailDetailTableEntity[];
  count: number;
}

export interface TerminalTrailDetailTableEntity {
  id: number;
  provider: string;
  serial_number: string;
  model_number: string;
  number_of_terminals: number;
  status: string;
}

export type AllZoneListData = AllZoneListEntity[];

export interface AllZoneListEntity {
  id: number;
  name: string;
}

export type AllBranchListData = AllBranchListEntity[];

export interface AllBranchListEntity {
  id: number;
  branch_name: string;
  reserved_terminals: string;
  zone: number;
}

export interface ZoneBranchTerminalData {
  overview: ZoneBranchTerminalOverview;
  stock_list: ZoneBranchTerminalStockList[];
  count: number;
}

export interface ZoneBranchTerminalOverview {
  state: string;
  branch: string;
  terminals_in_stock: number;
  number_of_delivered: number;
}

export interface ZoneBranchTerminalStockList {
  id: number;
  provider: string;
  serial_number: string;
  model_number: string;
  terminal_id: string;
  status: string;
  payment_status: string;
  is_assigned: string;
}

export interface ZoneBranchTerminalTrailsData {
  overview: ZoneBranchTerminalTrailsOverview;
  terminal_details: ZoneBranchTerminalTrailsEntity[];
  count: number;
}

export interface ZoneBranchTerminalTrailsOverview {
  state: string;
  branch: string;
  terminals_in_stock: number;
}

export interface ZoneBranchTerminalTrailsEntity {
  id: number;
  provider: string;
  number_of_terminals: number;
  status: string;
}

export interface TermionalLocationDto {
  stock_location: string;
  locationID: number | string;
}

export interface RoleDetailsData {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  type_of_user: string;
  role: string;
  user_id: string;
  name: string;
  log_in: string;
  last_session: string;
  status: string;
}

// sales type declaration
export interface SalesOverviewData {
  overview: SalesOverview;
  monthly_chart: SalesMonthlyChart;
}

export interface SalesOverview {
  number_of_sales_reps: number;
  number_of_pos_devices: number;
  total_pos_sold: SalesTotalPosSold;
  total_pos_sales: SalesTotalPosSales;
}

export interface SalesTotalPosSold {
  count: number;
  percentage: number;
  change: string;
}

export interface SalesTotalPosSales {
  amount: number;
  percentage: number;
  change: string;
}

export interface SalesMonthlyChart {
  total_pos_sales_amount: number;
  chart_label: string[];
  chart_data: number[];
}

export interface SalesSmallCardData {
  total: number;
  percentage: string;
  change: string;
}
export interface SalesSmallCardNoPercentageData {
  total: number;
}

export interface SalesTableData {
  sales_table: SalesTableEntity[];
  count: number;
}

export interface SalesTableEntity {
  id: number;
  name: string;
  amount: number;
  order: string;
  team: string;
  date: string;
  payment_method: string;
  payment_status: string;
}

export interface SalesRepresentativeData {
  status: string;
  message: string;
  data: repData;
}

export interface repData {
  representative_data: SalesRepresentativeEntity[];
  count: number;
}

export interface SalesRepresentativeEntity {
  id: number;
  name: string;
  sales_rep_id: string;
  device_sold: number;
  active: number;
  inactive: number;
  suspended: number;
  transaction_amount: number;
  transaction_count: number;
}

export interface SalesRepAgentDetailsData {
  data: SalesAgentData;
}

export interface SalesAgentData {
  agents: SalesRepAgentDetailsEntity[];
  count: number;
}

export interface SalesRepAgentDetailsEntity {
  id: number;
  name: string;
  email: string;
  terminal_id: string;
  transaction_count: number;
  total_transaction?: number;
  status: string;
}

export interface SalesRepProspectiveAgentData {
  data: SalesRepProspectiveData;
}

export interface SalesRepProspectiveData {
  prospective_agents: SalesRepProspectiveAgentEntity[];
  count: number;
}

export interface SalesRepProspectiveAgentEntity {
  id: number;
  date?: string;
  name?: string;
  phone: string;
  email: string;
  source: string;
  action: string;
}

export interface SalesRepRequestsHistoryData {
  data: RepRequestsHistoryData;
}

export interface RepRequestsHistoryData {
  requests_history: SalesRepRequestsHistoryEntity[];
  count: number;
}

export interface SalesRepRequestsHistoryEntity {
  id: number;
  date_requested: string;
  number_of_requested_terminals: number;
  number_of_assigned_terminals: number;
  date_assigned: string;
  assigned_by: string;
}

export interface SalesRepWalletHistoryData {
  data: WalletHistoryData;
}

export interface WalletHistoryData {
  wallet_history: SalesRepWalletHistoryEntity[];
  count: number;
}

export interface SalesRepWalletHistoryEntity {
  id: number;
  amount: number;
  user_full_name: string;
  transaction_mode?: string;
  transaction_type: string;
  liberty_reference: string;
  transaction_id: string;
  date_created: string;
  beneficiary_nuban?: string;
  status: string;
}

export interface SalesRepDisputeData {
  data: RepDisputeData;
}

export interface RepDisputeData {
  all_disputes: SalesRepDisputeEntity[];
  count: number;
}

export interface SalesRepDisputeEntity {
  id: number;
  pAN: string;
  narration: string;
  dispute_type: string;
  card_first_six_digits: string;
  card_last_four_digits: string;
  receiver_account_number: string;
  customer_mobile_number: string;
  customer_account_number: string;
  customer_name: string;
  transaction_rrn: string;
  transaction_date: string;
  issue: string;
  stan: string;
  requested_amount: number;
  dispensed_amount: number;
  terminal_id: string;
  respond_time: string;
  resolved_by: string;
  status: string;
  support_id: string;
  date_created: string;
}

export interface SalesProfileData {
  data: SalesProfileEntity;
}

export interface SalesProfileEntity {
  id: number;
  name: string;
  email: string;
  phone: string;
  branch: string;
  employee_id: string;
  terminal_last_login: string;
  mobile_last_login: string;
  web_last_login: string;
  state: string;
  lga: string;
  city: string;
  street: string;
  gender: string;
  marital_status: string;
  bvn: string;
}

export interface BranchSalesRepData {
  data: salesBranchHeadData;
}

export interface salesBranchHeadData {
  sales_reps: BranchSalesRepEntity[];
  count: number;
}

export interface BranchSalesRepEntity {
  id: number;
  name: string;
  devices_sold: number;
  active_devices: number;
  inactive_devices: number;
  suspended_devices: number;
  transaction_count: number;
  total_transaction?: number;
}

export interface SalesRecoverTerminalsData {
  terminals: SalesRecoverTerminalsEntity[];
  count: number;
}

export interface SalesRecoverTerminalsEntity {
  id: number;
  terminal_id: string;
  name: string;
  status: string;
  email: string;
  recovery_days_count: number;
}

export interface SalesRecoveredTerminalsData {
  terminals: SalesRecoveredTerminalsEntity[];
  count: number;
}

export interface SalesRecoveredTerminalsEntity {
  id: number;
  provider: string;
  serial_number: string;
  model_number: string;
  recovered: string;
  status: string;
}

export interface SalesStockRequestApprovalDto {
  liberty_pay_plus: number;
  hoirzon_pay: number;
  nairapoint: number;
  npsb: number;
  paydia: number;
  request_msg: string;
  request_type: string;
}

export interface PaymentHistoryData {
  message: string;
  data: PaymentHistoryEntity[];
}

export interface PaymentHistoryEntity {
  id: number;
  title: string;
  firstname?: string;
  lastname?: string;
  amount: number;
  account_name?: string;
  escrow_id?: string;
  bank_code?: string;
  bank_name?: string;
  account_number?: string;
  narration?: string;
  buddy_phone_number?: string;
  transfer_type: string;
}
