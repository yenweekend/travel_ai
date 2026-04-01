import { Database } from '@/types/database'

export type Profile = Database['public']['Tables']['profiles']['Row']

export type Itinerary = Database['public']['Tables']['ai_itineraries']['Row']
