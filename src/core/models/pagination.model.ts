export interface PaginatedResult<T> {
  data: T[];
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export type PaginateOptions = {
  page?: number | string;
  perPage?: number | string;
};

export type PaginateFunction = <T, K>(
  model: any,
  args?: K,
  options?: PaginateOptions,
) => Promise<PaginatedResult<T>>;
