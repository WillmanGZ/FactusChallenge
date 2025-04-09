export interface MunicipalitiesResponse {
  status: string;
  message: string;
  data: Municipality[];
}

export interface Municipality {
  id: number;
  code: string;
  name: string;
  department: string;
}
