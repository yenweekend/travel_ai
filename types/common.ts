export type ActionResult<T = void> =
  | {
      success: true
      data?: T
    }
  | {
      success: false
      errors: Record<string, string>
    }

export type SortOrder = 'asc' | 'desc'

export type SearchParams<T> = {
  keyword?: string
  sort_by?: keyof T
  sort_order?: SortOrder
}

export type PaginationMeta = {
  page: number
  per_page: number
  total_count: number
  total_pages: number
}

export type RangeFilter = {
  min: number | null
  max: number | null
}

export interface Filter {
  key: string
  label: string
  value: string
}

export type NumberFormat = 'numeric' | 'japanese'
