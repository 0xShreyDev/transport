import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function UberPageLayout() {
  const [location, setLocation] = useState({ lat: 20, lng: 77 });
  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selecting, setSelecting] = useState("pickup");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.error(err)
      );
    }
    const today = new Date();
    setDate(today.toISOString().split("T")[0]);
    setTime("12:00");
  }, []);

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const coords = { lat: e.latlng.lat, lng: e.latlng.lng };
        if (selecting === "pickup") setPickup(coords);
        else setDropoff(coords);
      },
    });
    return null;
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 pt-20">     
      <div className="flex flex-col lg:flex-row w-[95vw] h-[80vh] bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="w-full lg:w-1/3 bg-gray-50 p-8 flex flex-col justify-center gap-4">
          <h2 className="text-2xl font-bold mb-4">Book a Ride</h2>
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => setSelecting("pickup")}
              className={`flex-1 py-2 rounded-lg font-medium ${
                selecting === "pickup" ? "bg-green-600 text-white" : "bg-white border border-gray-300"
              }`}
            >
              Pickup
            </button>
            <button
              onClick={() => setSelecting("dropoff")}
              className={`flex-1 py-2 rounded-lg font-medium ${
                selecting === "dropoff" ? "bg-green-600 text-white" : "bg-white border border-gray-300"
              }`}
            >
              Dropoff
            </button>
          </div>

          <input
            type="text"
            placeholder="Pickup Location"
            value={pickup ? `${pickup.lat.toFixed(4)}, ${pickup.lng.toFixed(4)}` : ""}
            readOnly
            className="p-3 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
          />
          <input
            type="text"
            placeholder="Dropoff Location"
            value={dropoff ? `${dropoff.lat.toFixed(4)}, ${dropoff.lng.toFixed(4)}` : ""}
            readOnly
            className="p-3 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
          />

          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Service</option>
            <option value="Taxi">Taxi</option>
            <option value="Mini Bus">Mini Bus</option>
            <option value="Luxury Car">Luxury Car</option>
            <option value="Bike Ride">Bike Ride</option>
          </select>

          <div className="flex gap-2">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 outline-none flex-1 focus:ring-2 focus:ring-green-500"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 outline-none flex-1 focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button className="bg-green-600 text-white font-semibold py-3 rounded-lg mt-4 hover:bg-green-700 transition-colors">
            See Prices
          </button>
        </div>

        
        <div className="w-full lg:w-2/3 h-[100%]">
          <MapContainer center={[location.lat, location.lng]} zoom={13} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapClickHandler />
            {pickup && (
              <Marker position={[pickup.lat, pickup.lng]}>
                <Popup>Pickup Here</Popup>
              </Marker>
            )}
            {dropoff && (
              <Marker position={[dropoff.lat, dropoff.lng]}>
                <Popup>Dropoff Here</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
