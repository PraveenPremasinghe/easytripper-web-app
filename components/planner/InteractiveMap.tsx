"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Place } from "@/lib/places";

// Custom numbered icon generator
const createNumberedIcon = (number: number) => {
  return new L.DivIcon({
    className: "custom-map-marker",
    html: `<div style="background-color: #EF4444; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${number}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};

interface InteractiveMapProps {
  selectedPlaces: Place[];
}

function MapUpdater({ selectedPlaces }: { selectedPlaces: Place[] }) {
  const map = useMap();

  useEffect(() => {
    if (selectedPlaces.length > 0) {
      const bounds = L.latLngBounds(selectedPlaces.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      // Default view of Sri Lanka
      map.setView([7.8731, 80.7718], 7);
    }
  }, [selectedPlaces, map]);

  return null;
}

export default function InteractiveMap({ selectedPlaces }: InteractiveMapProps) {
  const pathCoordinates = selectedPlaces.map((place) => [place.lat, place.lng] as [number, number]);

  // Ensure Leaflet map panes have proper z-index
  useEffect(() => {
    if (typeof window !== "undefined") {
      const style = document.createElement("style");
      style.id = "leaflet-z-index-fix";
      style.textContent = `
        .leaflet-container {
          z-index: 0 !important;
        }
        .leaflet-pane {
          z-index: 0 !important;
        }
        .leaflet-map-pane {
          z-index: 0 !important;
        }
        .leaflet-tile-pane {
          z-index: 0 !important;
        }
        .leaflet-overlay-pane {
          z-index: 1 !important;
        }
        .leaflet-shadow-pane {
          z-index: 2 !important;
        }
        .leaflet-marker-pane {
          z-index: 3 !important;
        }
        .leaflet-tooltip-pane {
          z-index: 4 !important;
        }
        .leaflet-popup-pane {
          z-index: 5 !important;
        }
      `;
      if (!document.getElementById("leaflet-z-index-fix")) {
        document.head.appendChild(style);
      }
      return () => {
        const existingStyle = document.getElementById("leaflet-z-index-fix");
        if (existingStyle) {
          document.head.removeChild(existingStyle);
        }
      };
    }
  }, []);

  return (
    <MapContainer
      center={[7.8731, 80.7718]}
      zoom={7}
      style={{ height: "100%", width: "100%", borderRadius: "0.5rem", zIndex: 0 }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapUpdater selectedPlaces={selectedPlaces} />

      {selectedPlaces.map((place, index) => (
        <Marker 
          key={place.id} 
          position={[place.lat, place.lng]} 
          icon={createNumberedIcon(index + 1)}
        >
          <Popup>
            <div className="text-sm font-sans">
              <strong className="block text-base mb-1">{index + 1}. {place.name}</strong>
              <p className="m-0 text-muted-foreground">{place.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      {selectedPlaces.length > 1 && (
        <Polyline
          positions={pathCoordinates}
          pathOptions={{ color: "#4285F4", weight: 5, opacity: 0.8 }}
        />
      )}
    </MapContainer>
  );
}
