import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { MapPin, Navigation, User, Star, Clock, Phone } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Datos mock de tutores
const mockTutors = [
  {
    id: 1,
    name: 'Ana García',
    subjects: ['Matemáticas', 'Física'],
    rating: 4.8,
    hourlyRate: 25,
    location: { lat: -12.0464, lng: -77.0428 }, // Lima Centro
    distance: 2.1,
    avatar: '👩‍🏫',
    experience: '5 años',
    phone: '+51 987 654 321'
  },
  {
    id: 2,
    name: 'Carlos Mendoza',
    subjects: ['Programación', 'Matemáticas'],
    rating: 4.9,
    hourlyRate: 30,
    location: { lat: -12.0621, lng: -77.0365 }, // San Isidro
    distance: 3.5,
    avatar: '👨‍💻',
    experience: '7 años',
    phone: '+51 987 654 322'
  },
  {
    id: 3,
    name: 'María López',
    subjects: ['Química', 'Biología'],
    rating: 4.7,
    hourlyRate: 28,
    location: { lat: -12.1194, lng: -77.0309 }, // Surco
    distance: 1.8,
    avatar: '👩‍🔬',
    experience: '4 años',
    phone: '+51 987 654 323'
  },
  {
    id: 4,
    name: 'Pedro Quispe',
    subjects: ['Historia', 'Literatura'],
    rating: 4.6,
    hourlyRate: 22,
    location: { lat: -12.0432, lng: -77.0282 }, // Miraflores
    distance: 2.7,
    avatar: '📚',
    experience: '6 años',
    phone: '+51 987 654 324'
  },
  {
    id: 5,
    name: 'Laura Torres',
    subjects: ['Inglés', 'Francés'],
    rating: 4.9,
    hourlyRate: 35,
    location: { lat: -12.0931, lng: -77.0465 }, // Barranco
    distance: 4.2,
    avatar: '🌍',
    experience: '8 años',
    phone: '+51 987 654 325'
  }
];

// Componente para reccentrar el mapa cuando cambie la ubicación del usuario
const MapRecenter: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
};

export const LocalizarTutoresPage: React.FC = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTutor, setSelectedTutor] = useState<typeof mockTutors[0] | null>(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('La geolocalización no es compatible con este navegador.');
      setLoading(false);
      // Ubicación por defecto: Lima Centro
      setUserLocation([-12.0464, -77.0428]);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setLoading(false);
      },
      (error) => {
        console.error('Error obteniendo ubicación:', error);
        setError('No se pudo obtener tu ubicación. Mostrando ubicación por defecto.');
        // Ubicación por defecto: Lima Centro
        setUserLocation([-12.0464, -77.0428]);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutos
      }
    );
  };

  // Crear iconos personalizados
  const createTutorIcon = (avatar: string) => divIcon({
    className: 'tutor-marker',
    html: `<div class="tutor-marker">${avatar}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });

  const userIcon = divIcon({
    className: 'user-marker',
    html: '<div class="user-marker"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
  });

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Localizar Tutores 📍</h1>
          <p className="text-blue-100">Encuentra tutores cerca de tu ubicación</p>
        </div>

        {/* Loading */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Obteniendo tu ubicación...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Localizar Tutores 📍</h1>
            <p className="text-blue-100">Encuentra tutores cerca de tu ubicación</p>
          </div>
          <button
            onClick={getCurrentLocation}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            <Navigation className="h-4 w-4" />
            Actualizar ubicación
          </button>
        </div>
        
        {error && (
          <div className="mt-4 bg-yellow-500 bg-opacity-20 border border-yellow-300 rounded-lg p-3">
            <p className="text-yellow-100">{error}</p>
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-96 relative">
          {userLocation && (
            <MapContainer
              center={userLocation}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              className="rounded-2xl"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              <MapRecenter center={userLocation} />

              {/* Marcador del usuario */}
              <Marker position={userLocation} icon={userIcon}>
                <Popup>
                  <div className="text-center p-2">
                    <div className="flex items-center justify-center mb-2">
                      <User className="h-5 w-5 text-red-500 mr-2" />
                      <span className="font-semibold">Tu ubicación</span>
                    </div>
                    <p className="text-sm text-gray-600">Estás aquí</p>
                  </div>
                </Popup>
              </Marker>

              {/* Marcadores de tutores */}
              {mockTutors.map((tutor) => (
                <Marker
                  key={tutor.id}
                  position={[tutor.location.lat, tutor.location.lng]}
                  icon={createTutorIcon(tutor.avatar)}
                  eventHandlers={{
                    click: () => setSelectedTutor(tutor),
                  }}
                >
                  <Popup>
                    <div className="p-3 min-w-[250px]">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">{tutor.avatar}</span>
                        <div>
                          <h3 className="font-bold text-lg">{tutor.name}</h3>
                          <div className="flex items-center text-sm text-gray-600">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            {tutor.rating} • S/{tutor.hourlyRate}/hora
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {tutor.distance} km de distancia
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {tutor.experience} de experiencia
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-sm font-semibold mb-1">Materias:</p>
                        <div className="flex flex-wrap gap-1">
                          {tutor.subjects.map((subject, index) => (
                            <span
                              key={index}
                              className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mt-3 hover:bg-blue-700 transition-colors">
                        Contactar
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>

      {/* Lista de tutores */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Tutores disponibles cerca de ti</h2>
        <div className="grid gap-4">
          {mockTutors
            .sort((a, b) => a.distance - b.distance)
            .map((tutor) => (
              <div
                key={tutor.id}
                className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                  selectedTutor?.id === tutor.id
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedTutor(tutor)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{tutor.avatar}</span>
                    <div>
                      <h3 className="font-semibold text-lg">{tutor.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          {tutor.rating}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {tutor.distance} km
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {tutor.experience}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">S/{tutor.hourlyRate}/hora</p>
                    <div className="flex space-x-2 mt-2">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                        Contactar
                      </button>
                      <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        Llamar
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm font-medium mb-2">Especialidades:</p>
                  <div className="flex flex-wrap gap-2">
                    {tutor.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
