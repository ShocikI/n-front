'use client';
import React, { useEffect, useState, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import StartSearchbar from "../mapComponents/StartSearchbar";

type Props = { 
  changeLocation?: (lat: number, lng: number) => void,
  changeFormAddress?: (new_address: string) => void,
  onlyMap?: boolean 
}

export const GoogleMaps = ({ changeLocation, changeFormAddress, onlyMap }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const autoCompleteInputRef = useRef<HTMLInputElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markerInstance = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const geocoderInstance = useRef<google.maps.Geocoder | null>(null);

  const [ address, setAddress ] = useState('');
  const [ queryParams, setQueryParams ] = useState('');
  const [ areaRadius, setAreaRadius ] = useState(5);

  const handlePlaceSelection = async (position: google.maps.LatLngLiteral) => {
    if (!mapInstance.current || !markerInstance.current || !geocoderInstance.current) return;
    const lng = position.lng.toPrecision(6);
    const lat = position.lat.toPrecision(6)

    setQueryParams(`${lng}-${lat}`);
    changeLocation?.( Number(lat), Number(lng) );

    markerInstance.current.position = position;
    mapInstance.current.panTo(position);

    const response = await geocoderInstance.current.geocode({ location: position });
    if (response.results[0]) {
      const components = response.results[0].address_components;
      const new_address = `${components[1].long_name} ${components[0].long_name}, ${components[2].long_name}`
      setAddress(new_address);
      changeFormAddress?.(new_address);
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
    <div className="flex flex-col h-full w-full">
      <StartSearchbar 
        address={address} 
        queryParams={queryParams} 
        areaRadius={areaRadius}
        inputRef={autoCompleteInputRef}
        onSearch={handleAddressSearch}
        handleChangeAddress={setAddress}
        handleChangeQueryParams={setQueryParams}
        handleSetRadius={setAreaRadius}
        onlyMap={onlyMap}
      />
      <div className="h-full w-full" ref={mapRef} />
    </div>
  );
};