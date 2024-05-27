"use client"

import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import moment from "moment-timezone";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faSpotify, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

// Dynamically import Globe component with SSR disabled
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

const Contact = () => {
  const [city, setCity] = useState('New York');
  const [latitude, setLatitude] = useState(40.7128);
  const [longitude, setLongitude] = useState(-74.0060);
  const [timeZone, setTimeZone] = useState('America/New_York');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCityChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;

    if (name === 'city') setCity(value);
    if (name === 'latitude') setLatitude(parseFloat(value));
    if (name === 'longitude') setLongitude(parseFloat(value));
    if (name === 'timezone') setTimeZone(value);
  };

  return (
    <div className="relative min-h-screen p-4 bg-black text-white">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Boxes />
      </div>
      <TracingBeam>
        <div className="relative z-10 text-center mb-8">
          <div className="h-24 relative w-full overflow-hidden flex flex-col items-center justify-center rounded-lg">
            <div className="absolute inset-0 w-full h-full bg-black z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>My Contact Info</h1>
            <p className="text-lg text-gray-400">Feel free to reach out</p>
          </div>
          <div className="contact-info flex justify-center space-x-6 mt-6">
            <a href="https://www.linkedin.com/in/lei-chi/" className="text-blue-500 hover:text-blue-700">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a href="https://github.com/raymond-chii" className="text-gray-500 hover:text-gray-700">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a href="https://open.spotify.com/user/31behayvze3k4vryzl6uxkvynrvq?si=b99156dd880f459c" className="text-green-500 hover:text-green-700">
              <FontAwesomeIcon icon={faSpotify} size="2x" />
            </a>
            <a href="https://www.instagram.com/raycchii/" className="text-pink-500 hover:text-pink-700">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </div>
          <p className="mt-4 flex items-center justify-center"><FontAwesomeIcon icon={faPhone} className="mr-2" />+1(646)628-4417</p>
          <p className="flex items-center justify-center"><FontAwesomeIcon icon={faEnvelope} className="mr-2" />raymondchi56@gmail.com</p>
        </div>
        
        <div className="relative z-10">
          <div className="timezone-info text-center">
            <p>Current time in {city}: {moment().tz(timeZone).format('MMMM Do YYYY, h:mm:ss a')}</p>
          </div>
        </div>

        <div className="relative z-10 mb-8">
          {isMounted && (
            <div className="globe-container flex justify-center">
              <Globe
                width={600}
                height={600}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                pointsData={[{
                  lat: latitude,
                  lng: longitude,
                  size: 10,
                  color: 'red'
                }]}
                pointAltitude={0.05}
                pointColor={() => 'red'}
                atmosphereColor="rgba(255, 255, 255, 0.5)"
                atmosphereAltitude={0.25}
              />
            </div>
          )}
        </div>
        
        <div className="relative z-10 mb-8">
          <div className="input-container max-w-lg mx-auto">
            <input type="text" name="city" placeholder="City" value={city} onChange={handleCityChange} className="w-full p-2 mb-4 bg-gray-800 text-white rounded"/>
            <input type="number" name="latitude" placeholder="Latitude" value={latitude} onChange={handleCityChange} className="w-full p-2 mb-4 bg-gray-800 text-white rounded"/>
            <input type="number" name="longitude" placeholder="Longitude" value={longitude} onChange={handleCityChange} className="w-full p-2 mb-4 bg-gray-800 text-white rounded"/>
            <input type="text" name="timezone" placeholder="Time Zone" value={timeZone} onChange={handleCityChange} className="w-full p-2 mb-4 bg-gray-800 text-white rounded"/>
          </div>
        </div>
        
      </TracingBeam>
    </div>
  );
};

export default Contact;