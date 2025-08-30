import React, { useState } from 'react';
import { Star, Filter, TrendingUp } from 'lucide-react';
import { Review } from '../../types';

export const ReviewsPage: React.FC = () => {
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const mockReviews: Review[] = [
    {
      id: '1',
      tutorId: '1',
      studentId: '2',
      rating: 5,
      comment: 'Excelente tutor! Me ayudó muchísimo con cálculo. Explica de manera muy clara y tiene mucha paciencia.',
      subject: 'Matemáticas',
      createdAt: new Date(Date.now() - 86400000),
    },
    {
      id: '2',
      tutorId: '1',
      studentId: '3',
      rating: 4,
      comment: 'Muy buena clase de programación. Carlos domina muy bien el tema y los ejercicios fueron útiles.',
      subject: 'Programación',
      createdAt: new Date(Date.now() - 172800000),
    },
    {
      id: '3',
      tutorId: '1',
      studentId: '4',
      rating: 5,
      comment: 'Ana me ayudó mucho con estadística. Su método de enseñanza es genial y muy fácil de entender.',
      subject: 'Estadística',
      createdAt: new Date(Date.now() - 259200000),
    },
  ];

  const filteredReviews = filterRating 
    ? mockReviews.filter(review => review.rating === filterRating)
    : mockReviews;

  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length;
  
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: mockReviews.filter(review => review.rating === rating).length,
    percentage: (mockReviews.filter(review => review.rating === rating).length / mockReviews.length) * 100,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reseñas y calificaciones</h2>
        <p className="text-gray-600">Feedback de tus estudiantes</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Calificación promedio</h3>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{mockReviews.length} reseñas totales</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Reseñas este mes</h3>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">8</div>
          <p className="text-sm text-green-600">+20% vs mes anterior</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Satisfacción</h3>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">94%</div>
          <p className="text-sm text-gray-600">Estudiantes satisfechos</p>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución de calificaciones</h3>
        <div className="space-y-3">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 w-12">
                <span className="text-sm font-medium">{rating}</span>
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-8">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Filtrar por:</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilterRating(null)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filterRating === null ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todas
          </button>
          {[5, 4, 3, 2, 1].map(rating => (
            <button
              key={rating}
              onClick={() => setFilterRating(rating)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filterRating === rating ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {rating}★
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">A</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Estudiante anónimo</p>
                  <p className="text-sm text-gray-600">{review.subject}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-3">{review.comment}</p>
            <p className="text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};