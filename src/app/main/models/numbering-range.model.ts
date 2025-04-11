export interface NumberingRangeResponse {
  data: NumberingRange[];
}

export interface NumberingRange {
  id: number;
  document: string;
  prefix: string;
  from: number;
  to: number;
  current: number;
  resolution_number: null | string;
  start_date: string;
  end_date: string;
  technical_key: null | string;
  is_expired: boolean;
  is_active: number;
  created_at: Date;
  updated_at: Date;
}
