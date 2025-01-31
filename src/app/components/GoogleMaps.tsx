'use client';
import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export const GoogleMaps = () => {
    const mapRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initializeMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: 'weekly'
            });

            const { Map } = await loader.importLibrary('maps');

            const locationInMap = {
                lat: 50.00000,
                lng: 20.00000,
            };

            const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary;


            const options: google.maps.MapOptions = {
                center: locationInMap,
                zoom: 15, // Check
                mapId: 'NEXT_MAPS_TUTS',
            };

            const map = new Map(mapRef.current as HTMLDivElement, options);
            const marker = new Marker({
                map: map,
                position: locationInMap,
            });
        };

        initializeMap();
    }, [])

    return (
        <div className="h-[60vh] w-full" ref={mapRef}/>
    )
}