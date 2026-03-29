import { Database } from '@/types/database'

export type Hotel = Database['public']['Tables']['hotels']['Row']

export type HotelAmenity =
  Database['public']['Tables']['hotel_amenities']['Row']

export type HotelImage = Database['public']['Tables']['hotel_images']['Row']

export type HotelTag = Database['public']['Tables']['hotel_tags']['Row']
