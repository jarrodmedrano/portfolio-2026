import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import SelectedWork from '@/components/SelectedWork';
import WhatIBuild from '@/components/WhatIBuild';
import Technologies from '@/components/Technologies';
import RecentThoughts from '@/components/RecentThoughts';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <SelectedWork />
        <WhatIBuild />
        <Technologies />
        <RecentThoughts />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
