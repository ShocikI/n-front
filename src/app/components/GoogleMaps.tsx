'use client';
import React, { useEffect, useState, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import StartSearchbar from "./StartSearchbar";

export const GoogleMaps = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const autoCompleteInputRef = useRef<HTMLInputElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markerInstance = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const geocoderInstance = useRef<google.maps.Geocoder | null>(null);

  const [location, setLocation] = useState('');
  const [queryParams, setQueryParams] = useState('');
  const [areaRadius, setAreaRadius] = useState(5);

  const handlePlaceSelection = async (position: google.maps.LatLngLiteral) => {
    if (!mapInstance.current || !markerInstance.current || !geocoderInstance.current) return;

    setQueryParams(`${position.lng.toPrecision(6)}-${position.lat.toPrecision(6)}`);

    markerInstance.current.position = position;
    mapInstance.current.panTo(position);

    const response = await geocoderInstance.current.geocode({ location: position });
    if (response.results[0]) {
      const components = response.results[0].address_components;
      setLocation(`${components[1].long_name} ${components[0].long_name}, ${components[2].long_name}`);
    }
  };

  const handleAddressSearch = async (address: string) => {
    if (!geocoderInstance.current) return;
    
    try {
      const response = await geocoderInstance.current.geocode({ address });
      if (response.results[0]?.geometry?.location) {
        const location = response.results[0].geometry.location.toJSON();
        handlePlaceSelection(location);
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
    }
  };

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: 'weekly'
      });

      const { Map } = await loader.importLibrary('maps');
      const { Geocoder } = await loader.importLibrary('geocoding');
      const { AdvancedMarkerElement, PinElement } = await loader.importLibrary('marker');
      const { Autocomplete } = await loader.importLibrary('places');

      const map = new Map(mapRef.current!, {
        center: { lat: 50.062, lng: 19.938 },
        zoom: 8,
        mapId: 'NJOY_MAP',
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false
      });

      const geocoder = new Geocoder();
      const marker = new AdvancedMarkerElement({
        map,
        content: new PinElement({
          background: 'orange',
          borderColor: 'white',
          glyphColor: 'white'
        }).element
      });

      const autocomplete = new Autocomplete(autoCompleteInputRef.current!, {
        componentRestrictions: { country: 'pl' }
      });

      mapInstance.current = map;
      markerInstance.current = marker;
      geocoderInstance.current = geocoder;

      map.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (e.latLng) handlePlaceSelection(e.latLng.toJSON());
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry?.location) {
          handlePlaceSelection(place.geometry.location.toJSON());
        }
      });
    };

    initMap();
  }, []);

  return (
    <div className="flex flex-col basis-2/4">
      <StartSearchbar 
        location={location} 
        queryParams={queryParams} 
        areaRadius={areaRadius}
        inputRef={autoCompleteInputRef}
        onSearch={handleAddressSearch}
        handleChangeLocation={setLocation}
        handleChangeQueryParams={setQueryParams}
        handleSetRadius={setAreaRadius}
      />
      <div className="h-[60vh] w-full" ref={mapRef} />
    </div>
  );
};