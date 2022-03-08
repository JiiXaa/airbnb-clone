import Head from 'next/head';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import SmallCard from '../components/SmallCard';
import MediumCard from '../components/MediumCard';
import LargeCard from '../components/LargeCard';
import Footer from '../components/Footer';

import outdoor from '../public/img/outdoor2.jpg';

export default function Home({ exploreData, cardsData }) {
  return (
    <div className=''>
      <Head>
        <title>Airbnb my OWN!</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <NavBar />
      <Hero />

      <main className='max-w-7xl mx-auto px-8 m-10 sm:px-16 shadow-lg rounded-md'>
        <section className='pt-6'>
          <h2 className='text-4xl font-semibold pb-5'>Explore Nearby</h2>

          {/* Pull data from a server (API endpoints) */}
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {exploreData?.map(({ img, distance, location }) => (
              <SmallCard
                key={img}
                img={img}
                distance={distance}
                location={location}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>

          <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3'>
            {cardsData?.map(({ img, title }) => (
              <MediumCard key={img} img={img} title={title} />
            ))}
          </div>
        </section>

        <LargeCard
          img={outdoor}
          title='The Greatest Outdoors'
          description='All for You! by Airbnb'
          buttonText='Get Inspired'
        />
      </main>

      <Footer />
    </div>
  );
}

// static data passed to props (NextJS feature)
export async function getStaticProps() {
  const exploreData = await fetch('https://jsonkeeper.com/b/SD9K').then((res) =>
    res.json()
  );

  const cardsData = await fetch('https://jsonkeeper.com/b/MCVG').then((res) =>
    res.json()
  );

  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
