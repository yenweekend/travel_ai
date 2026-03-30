import { Database } from '@/types/database'
import { Profile } from '@/types/user'

export type Destination = Database['public']['Tables']['destinations']['Row']
export type DestinationTag =
  Database['public']['Tables']['destination_tags']['Row']
export type DestinationImage =
  Database['public']['Tables']['destination_images']['Row']

export type Review = Pick<
  Database['public']['Tables']['reviews']['Row'],
  'id' | 'rating' | 'comment' | 'created_at'
> & { profiles: Pick<Profile, 'full_name' | 'avatar_url'> }

export type DestinationTagCustom = {
  tags: Omit<Database['public']['Tables']['tags']['Row'], 'created_at'>[]
}

export type DestinationDetail = Destination & {
  reviews: Review[]
  destination_images: Pick<
    Database['public']['Tables']['destination_images']['Row'],
    'id' | 'image_url' | 'caption' | 'sort_order'
  >[]
  attractions: Pick<
    Database['public']['Tables']['attractions']['Row'],
    'id' | 'name' | 'description' | 'image_url' | 'entry_fee' | 'sort_order'
  >[]
  tags: Omit<Database['public']['Tables']['tags']['Row'], 'created_at'>[]
}
