import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedDrops from '@/components/home/FeaturedDrops';

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedDrops />
      <Footer />
    </main>
  );
}
