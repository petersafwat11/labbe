import React, { useState, useCallback } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useFormContext, useController } from "react-hook-form";
import styles from "./MapInput.module.css";

const DEFAULT_POSITION = { lat: 24.7136, lng: 46.6753 };
const API_KEY = "AIzaSyCcOWxQgXGToRfKLlt1KjU_ev-ohFmPbRY";

const MapInput = ({ name, label, required, hintMessage }) => {
  const { control, clearErrors } = useFormContext();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: {
      address: "",
      latitude: DEFAULT_POSITION.lat,
      longitude: DEFAULT_POSITION.lng,
      city: "",
      country: "",
    },
  });

  const [searchQuery, setSearchQuery] = useState(value?.address || "");
  const [mapCenter, setMapCenter] = useState({
    lat: value?.latitude || DEFAULT_POSITION.lat,
    lng: value?.longitude || DEFAULT_POSITION.lng,
  });
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const extractAddressComponent = (result, type) => {
    const component = result.address_components?.find((comp) =>
      comp.types.includes(type)
    );
    return component?.long_name || "";
  };

  const updateLocation = (result, lat, lng) => {
    const locationData = {
      address: result.formatted_address,
      latitude: lat,
      longitude: lng,
      city: extractAddressComponent(result, "locality"),
      country: extractAddressComponent(result, "country"),
    };

    setSearchQuery(result.formatted_address);
    setMapCenter({ lat, lng });
    onChange(locationData);
    clearErrors(name);
  };

  const reverseGeocode = async (lat, lng) => {
    if (!window.google) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        updateLocation(results[0], lat, lng);
      }
    });
  };

  const handleMapClick = useCallback((event) => {
    if (!event.detail?.latLng) return;
    const { lat, lng } = event.detail.latLng;
    reverseGeocode(lat, lng);
  }, []);

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim() || !window.google) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        updateLocation(results[0], lat, lng);
      } else {
        alert("Location not found. Please try a different search term.");
      }
    });
  }, [searchQuery]);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        reverseGeocode(latitude, longitude);
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        setIsLoadingLocation(false);
        alert("Unable to retrieve your location. Please try again.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.input_group}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div className={styles.controls}>
        <div className={styles.search_form}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for a location..."
            className={styles.search_input}
          />
          <button
            type="button"
            onClick={handleSearch}
            className={styles.search_button}
            disabled={!searchQuery.trim()}
          >
            <img
              src="/svg/events/search.svg"
              alt="Search"
              width={16}
              height={16}
            />
          </button>
        </div>

        <button
          type="button"
          onClick={getCurrentLocation}
          disabled={isLoadingLocation}
          className={styles.location_button}
          title="Use my current location"
        >
          {isLoadingLocation ? (
            <span className={styles.loading_spinner}>⟳</span>
          ) : (
            <img
              src="/svg/events/location.svg"
              alt="My Location"
              width={16}
              height={16}
            />
          )}
        </button>
      </div>

      <div className={styles.input_container}>
        <div className={styles.map_wrapper}>
          <APIProvider apiKey={API_KEY}>
            <Map
              onClick={handleMapClick}
              center={mapCenter}
              defaultZoom={13}
              className={styles.map}
              gestureHandling="greedy"
              disableDefaultUI={false}
              zoomControl={true}
              mapTypeControl={false}
              streetViewControl={false}
              fullscreenControl={false}
            >
              <Marker position={mapCenter} />
            </Map>
          </APIProvider>
        </div>
      </div>

      {value?.address && (
        <div className={styles.address_display}>
          <strong>Selected Address:</strong> {value.address}
        </div>
      )}

      {error && (
        <div className={styles.error_container}>
          <p className={styles.error}>{error.message}</p>
        </div>
      )}

      {hintMessage && <p className={styles.hint}>{hintMessage}</p>}
    </div>
  );
};

export default MapInput;
