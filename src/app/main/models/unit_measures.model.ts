export interface UnitMeasureResponse {
  status:  string;
  message: string;
  data:    UnitMeasure[];
}

export interface UnitMeasure {
  id:   number;
  code: string;
  name: string;
}
