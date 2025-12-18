import React from 'react';
import Hero from '../components/Hero';
import BrandStory from '../components/BrandStory';
import JournalSection from '../components/JournalSection';

const Home = () => {
    return (
        <>
            <Hero />
            <BrandStory />
            <JournalSection />
            <FeaturedCollection />
        </>
    );
};

export default Home;
