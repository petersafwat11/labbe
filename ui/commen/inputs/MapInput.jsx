import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { useFormContext, useController } from 'react-hook-form';
import styles from './MapInput.module.css';

const DEFAULT_POSITION = { lat: 0.0, lng: 0.0 };

const MapInput = ({ name, label, required, hintMessage }) => {
  const {
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext();
  const {
    field: { value = DEFAULT_POSITION, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: DEFAULT_POSITION,
  });

  const handleMapClick = (v) => {
    clearErrors(name);
    if (v.detail && v.detail.latLng) {
      onChange({
        lat: v.detail.latLng.lat,
        lng: v.detail.latLng.lng,
      });
    }
  };

  const isClient = typeof window !== 'undefined';

  return (
    <div className={styles.input_group}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.input_container}>
        {isClient ? (
          <div className={styles.map_wrapper}>
            <APIProvider apiKey={'AIzaSyCcOWxQgXGToRfKLlt1KjU_ev-ohFmPbRY'}>
              <Map
                onClick={handleMapClick}
                defaultCenter={value || DEFAULT_POSITION}
                defaultZoom={3}
                tiltInteractionEnabled
                className={styles.map}
              >
                <Marker position={value || DEFAULT_POSITION} />
              </Map>
            </APIProvider>
          </div>
        ) : (
          <div className={styles.loading}>Loading...</div>
        )}
      </div>
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
