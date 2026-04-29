export interface Barber {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  description: string;
  photo: string; // URL to real photograph
  instagram?: string;
  vk?: string;
}

export const barbers: Barber[] = [
  {
    id: 'alexey',
    name: 'Алексей',
    specialty: 'Мастер мужских стрижек',
    experience: 7,
    description: 'Специализируется на классических и модельных стрижках. Мастер спорта по барберингу.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
    instagram: 'https://instagram.com/',
    vk: 'https://vk.com/',
  },
  {
    id: 'dmitry',
    name: 'Дмитрий',
    specialty: 'Эксперт по бороде',
    experience: 6,
    description: 'Король бороды и усов. Чемпион России по моделированию бороды 2024.',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop',
    instagram: 'https://instagram.com/',
    vk: 'https://vk.com/',
  },
  {
    id: 'sergey',
    name: 'Сергей',
    specialty: 'Бритьё опасной бритвой',
    experience: 9,
    description: 'Классическое бритьё — его призвание. Обучался в Лондонской школе барберов.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop',
    instagram: 'https://instagram.com/',
    vk: 'https://vk.com/',
  },
  {
    id: 'elena',
    name: 'Елена',
    specialty: 'Уход и стайлинг',
    experience: 5,
    description: 'Специалист по укладке, камуфляжу седины и окрашиванию. Творческий подход к каждой работе.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop',
    instagram: 'https://instagram.com/',
    vk: 'https://vk.com/',
  },
];
