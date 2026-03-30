import { Database } from '@/types/database'
import { Review } from '@/types/destination'

export type Hotel = Database['public']['Tables']['hotels']['Row']

export type HotelAmenity =
  Database['public']['Tables']['hotel_amenities']['Row']

export type HotelImage = Database['public']['Tables']['hotel_images']['Row']

export type HotelTag = Database['public']['Tables']['hotel_tags']['Row']

export type HotelDetail = Hotel & {
  reviews: Review[]
  hotel_images: Pick<
    Database['public']['Tables']['hotel_images']['Row'],
    'id' | 'image_url' | 'caption' | 'sort_order'
  >[]
  room_types: Database['public']['Tables']['room_types']['Row'][]
  amenities: Omit<
    Database['public']['Tables']['amenities']['Row'],
    'created_at' | 'category'
  >[]
}
