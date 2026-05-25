import { Star, Clock, DollarSign } from 'lucide-react';

interface TutorCardProps {
  tutor: {
    id: number;
    name: string;
    subject: string;
    rating: number;
    reviews: number;
    price: number;
    experience: string;
    avatar: string;
    availability: string;
  };
  onBook: () => void;
}

export function TutorCard({ tutor, onBook }: TutorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <img
          src={tutor.avatar}
          alt={tutor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold mb-1">{tutor.name}</h3>
          <p className="text-gray-600 mb-2">{tutor.subject}</p>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{tutor.rating}</span>
            <span className="text-gray-500">({tutor.reviews} reseñas)</span>
          </div>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{tutor.experience}</p>

      <div className="flex items-center justify-between mb-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{tutor.availability}</span>
        </div>
        <div className="flex items-center gap-1 font-semibold text-green-600">
          <DollarSign className="w-4 h-4" />
          <span>{tutor.price}/hora</span>
        </div>
      </div>

      <button
        onClick={onBook}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Reservar Clase
      </button>
    </div>
  );
}
