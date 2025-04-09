export interface CountryResponse {
  status:  string;
  message: string;
  data:    Country[];
}

export interface Country {
  id:   number;
  code: string;
  name: string;
}
