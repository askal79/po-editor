export interface ResponseError {
  statusCode?: number;
  errors: string[];
  code?: string;
  timestamp?: string;
  path?: string;
  method?: string;
}
