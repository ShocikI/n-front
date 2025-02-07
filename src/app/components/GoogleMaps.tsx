'use client';
import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import StartSearchbar from "./StartSearchbar";


export const GoogleMaps = () => {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const autoCompleteInputRef = React.useRef<HTMLInputElement>(null);

  const [ location, setLocation ] = useState(''); // Input value
  const [ queryParams, setQueryParams ] = useState('');
  const [ autoComplete, setAutoComplete ] = useState<google.maps.places.Autocomplete | null>(null); // AutoComplete Input

  const handleChangeLocation = (address: string) => setLocation(address);
  const handleChangeQueryParams = (newQuery: string) => setQueryParams(newQuery);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: 'weekly'
      });
      const { Map } = await loader.importLibrary('maps');
      const { Geocoder } = await loader.importLibrary('geocoding')
      const { AdvancedMarkerElement, PinElement } = await loader.importLibrary('marker');
      const { Autocomplete } = await loader.importLibrary('places');
      
      const locationInMap = { lat: 50.062, lng: 19.938, };
      const optionsMap: google.maps.MapOptions = { 
        center: locationInMap, 
        streetViewControl: false, 
        fullscreenControl: false, 
        mapTypeControlOptions: { mapTypeIds: ['roadmap'] }, 
        zoom: 8,  
        mapId: 'NJOY_MAP', 
        mapTypeId: 'roadmap' 
      };
      const optionsAutoComplete: google.maps.places.AutocompleteOptions = {
        componentRestrictions: { country: 'pl' },
      }

      const map = new Map(mapRef.current as HTMLDivElement, optionsMap);
      
      // Prepare geocoder
      const geocoder = new Geocoder();
      // Add marker style
      const markerStyle = new PinElement({ background: 'orange', borderColor: 'white', glyphColor: 'white' });
      // Prepare marker to show on map
      const marker = new AdvancedMarkerElement({ content: markerStyle.element, map: map });

      const autoCompleteInput = new Autocomplete(autoCompleteInputRef.current as HTMLInputElement, optionsAutoComplete)
      setAutoComplete(autoCompleteInput);

      map.addListener("click", (e: any) => updateMarker(e.latLng, map, marker, geocoder));
    };

    const updateMarker = async (
      position: google.maps.LatLngAltitude, 
      map: google.maps.Map,
      marker: google.maps.marker.AdvancedMarkerElement,
      geocoder: google.maps.Geocoder
    ) => { 
      // Prepare queryParamsParam
      var jsonPoint = position.toJSON()
      setQueryParams(`${jsonPoint.lat}-${jsonPoint.lng}`)

      // Change marker position
      marker.position = position
      map.panTo(position);

      // Get address from point
      geocoder.geocode({ location: position })
        .then((response) => {
          if (response.results[0]) {
            const components = response.results[0].address_components;
            handleChangeLocation(`${components[1].long_name} ${components[0].long_name}, ${components[2].long_name}`);
          };
        });
    };

    initMap();
  }, [])

  return (
    <div className="flex flex-col basis-2/4">
      <StartSearchbar 
        location={location} 
        queryParams={queryParams} 
        handleChangeQueryParams={handleChangeQueryParams} 
        handleChangeLocation={handleChangeLocation}
        inputRef={autoCompleteInputRef}
        />
      <div className="h-[60vh] w-full" ref={mapRef}/>
    </div>
  )
}