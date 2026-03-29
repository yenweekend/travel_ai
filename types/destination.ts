import { Database } from '@/types/database'

export type Destination = Database['public']['Tables']['destinations']['Row']
export type DestinationTag =
  Database['public']['Tables']['destination_tags']['Row']
export type DestinationImage =
  Database['public']['Tables']['destination_images']['Row']
