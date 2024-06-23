import React, { useEffect } from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../store/hooks/use-map';
import {City} from '../types/city';
import {Point} from '../types/point';
import 'leaflet/dist/leaflet.css';
import { MapMarker } from '../const';
import { useAppSelector } from '../store/hooks';

type MapProps = {
  city: City;
  points: Point[];
}

function Map({city, points}: MapProps): JSX.Element {
  const selectedPoint = useAppSelector((state) => state.currentPoint);
  const mapRef = React.useRef(null);
  const map = useMap(mapRef, city);
  useEffect(() => {
    if(map) {
      const markerLayer = layerGroup().addTo(map);
      map.panTo(selectedPoint === undefined
        ? [city.location.latitude, city.location.longitude]
        : [selectedPoint.latitude, selectedPoint.longitude]
      );
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });
        marker
          .setIcon(
            new Icon({
              iconUrl: point === selectedPoint ? MapMarker.Current : MapMarker.Default,
              iconAnchor: [14, 40]
            })
          )
          .addTo(markerLayer);
      });


      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [city.location.latitude, city.location.longitude, map, points, selectedPoint]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
