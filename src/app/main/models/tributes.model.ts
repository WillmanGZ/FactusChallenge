export interface TributesResponse {
  status:  string;
  message: string;
  data:    Tribute[];
}

export interface Tribute {
  id:          number;
  code:        string;
  name:        string;
  description: string;
}
