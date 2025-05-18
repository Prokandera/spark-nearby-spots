
import React from 'react';
import Navbar from '@/components/Navbar';
import { BatteryCharging } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <BatteryCharging className="h-12 w-12 mx-auto mb-4 text-ev-blue" />
          <h1 className="text-4xl font-bold">About EV Finder</h1>
          <div className="h-1 w-20 bg-ev-blue mx-auto mt-4"></div>
        </div>
        
        <div className="prose max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="mb-4">
              EV Finder is dedicated to making electric vehicle charging accessible and convenient for everyone. 
              Our mission is to eliminate range anxiety and facilitate the transition to sustainable transportation 
              by providing reliable, up-to-date information about charging stations.
            </p>
            <p>
              We believe that by simplifying the process of finding and using charging stations, 
              we can help accelerate the adoption of electric vehicles and contribute to a cleaner, greener future.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How We Work</h2>
            <p className="mb-4">
              EV Finder aggregates data from various charging networks to provide a comprehensive view 
              of charging infrastructure. We update our station information in real-time, including 
              availability status, so you always know where to find an available charger.
            </p>
            <p>
              Our platform integrates with mapping services to provide accurate navigation directions 
              to your chosen charging station, making your journey as smooth as possible.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Our Data</h2>
            <p className="mb-4">
              We source our data from:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Direct integrations with major charging networks</li>
              <li>Open Charge Map API</li>
              <li>Government databases of registered charging stations</li>
              <li>User-contributed data (verified by our team)</li>
            </ul>
            <p>
              All data is regularly validated to ensure accuracy. If you notice any inaccuracies, 
              please use our feedback form to let us know.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="mb-4">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            <p>
              Email: info@evfinder.example.com<br />
              Phone: +1 (555) 123-4567<br />
              Address: 123 Electric Avenue, San Francisco, CA 94103
            </p>
          </section>
        </div>
      </main>
      
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <BatteryCharging className="h-6 w-6 text-ev-blue mr-2" />
              <span className="font-bold text-xl">EV Finder</span>
            </div>
            <div className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} EV Finder. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
