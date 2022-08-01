export interface PaginateResultDto<T> {
  data: T[];
  search?: string;
  type?: string;
  sort?: string;
  page: number;
  perPage: number;
  total: number;
}
