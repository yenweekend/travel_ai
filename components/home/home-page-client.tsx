import HeroSection from '@/components/home/heroc-section'
import { FeaturedDestinations } from '@/components/home/featured-destinations'
import { Destination } from '@/types/destination'
import { Hotel } from '@/types/hotel'
import { FeaturedHotels } from '@/components/home/featured-hotels'
import { CtaSection } from '@/components/home/cta-section'

interface HomePageClientProps {
  destinations: Destination[]
  hotels: Hotel[]
}

export const HomePageClient = ({
  destinations,
  hotels,
}: HomePageClientProps) => {
  return (
    <>
      <main>
        <HeroSection />
        <FeaturedDestinations destinations={destinations} />
        <FeaturedHotels hotels={hotels} />
        <CtaSection />
      </main>
    </>
  )
}
