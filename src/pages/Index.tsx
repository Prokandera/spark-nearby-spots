
import React from 'react';
import { Link } from 'react-router-dom';
import { BatteryCharging, MapPin, Car, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-ev-light to-background px-4 py-24 md:py-32">
        <div className="container mx-auto max-w-5xl flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ev-dark">
              Find EV Charging Stations Near You
            </h1>
            <p className="text-lg md:text-xl text-gray-700">
              Locate and navigate to nearby charging stations for your electric vehicle with real-time availability information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-ev-blue hover:bg-ev-blue/90 text-white"
                asChild
              >
                <Link to="/map">
                  <MapPin className="mr-2 h-5 w-5" />
                  Find Nearby Stations
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-ev-blue text-ev-blue hover:bg-ev-blue/10"
                asChild
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1647427060116-27d39c022293?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="Electric Vehicle Charging" 
              className="rounded-lg shadow-xl max-w-full h-auto" 
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-ev-purple/10 p-4 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-ev-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Stations</h3>
              <p className="text-gray-600 mb-4">Locate charging stations near you with our interactive map and real-time availability.</p>
              <Button 
                variant="outline" 
                className="border-ev-purple text-ev-purple hover:bg-ev-purple/10 mt-auto"
                asChild
              >
                <Link to="/map">
                  <MapPin className="mr-2 h-4 w-4" />
                  Open Map
                </Link>
              </Button>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-ev-blue/10 p-4 rounded-full mb-4">
                <Info className="h-8 w-8 text-ev-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Details</h3>
              <p className="text-gray-600">View detailed information about each station including charging speeds, pricing, and amenities.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-ev-sky/10 p-4 rounded-full mb-4">
                <Car className="h-8 w-8 text-ev-sky" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Charging</h3>
              <p className="text-gray-600">Navigate to your chosen station and begin charging your electric vehicle with ease.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-ev-dark text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="max-w-3xl mx-auto">
            <BatteryCharging className="h-12 w-12 mx-auto mb-6 text-ev-blue" />
            <h2 className="text-3xl font-bold mb-4">Ready to Find a Charging Station?</h2>
            <p className="text-lg mb-8 text-gray-300">
              Access thousands of charging stations across the country. Whether you're planning a trip or just need a quick charge, we've got you covered.
            </p>
            <Button 
              size="lg" 
              className="bg-ev-blue hover:bg-ev-blue/90" 
              asChild
            >
              <Link to="/map">
                <MapPin className="mr-2 h-5 w-5" />
                Find Stations Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
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

export default Index;
