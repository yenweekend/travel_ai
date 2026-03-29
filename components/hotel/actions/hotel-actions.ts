'use server'

import { createServerAction } from '@/lib/utils/server-actions'
import { createClient } from '@/lib/supabase/server'

export const getHotels = createServerAction(
  async (params?: {
    search?: string
    starRating?: number
    province?: string
    limit?: number
    offset?: number
    featured?: boolean
  }) => {
    const supabase = await createClient()

    let query = supabase
      .from('hotels')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (params?.search) {
      query = query.or(
        `name.ilike.%${params.search}%,province.ilike.%${params.search}%`
      )
    }
    if (params?.starRating) {
      query = query.eq('star_rating', params.starRating)
    }
    if (params?.province) {
      query = query.ilike('province', `%${params.province}%`)
    }
    if (params?.featured) {
      query = query.eq('is_featured', true)
    }
    if (params?.limit) {
      query = query.limit(params.limit)
    }
    if (params?.offset) {
      query = query.range(
        params.offset,
        params.offset + (params?.limit || 12) - 1
      )
    }

    const { data, error, count } = await query
    if (error) throw new Error(error.message)

    return { destinations: data || [], count: count || 0 }
  }
)
