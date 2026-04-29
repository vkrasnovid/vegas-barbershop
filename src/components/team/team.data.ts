export interface Barber {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  description: string;
  photo: string; // path to WebP image
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
    photo: '/images/team/barber-01.svg',
    instagram: 'https://instagram.com/',
    vk: 'https://vk.com/',
  },
  {
    id: 'dmitry',
    name: 'Дмитрий',
    specialty: 'Эксперт по бороде',
    experience: 6,
    description: 'Король бороды и усов. Чемпион России по моделированию бороды 2024.',
    photo: '/images/team/barber-02.svg',
    instagram: 'https://instagram.com/',
    vk: 'https://vk.com/',
  },
  {
    id: 'sergey',
    name: 'Сергей',
    specialty: 'Бритьё опасной бритвой',
    experience: 9,
    description: 'Классическое бритьё — его призвание. Обучался в Лондонской школе барберов.',
    photo: '/images/team/barber-03.svg',
    instagram: 'https://instagram.com/',
    vk: 'https://vk.com/',
  },
  {
    id: 'elena',
    name: 'Елена',
    specialty: 'Уход и стайлинг',
    experience: 5,
    description: 'Специалист по укладке, камуфляжу седины и окрашиванию. Творческий подход к каждой работе.',
    photo: '/images/team/barber-04.svg',
    instagram: 'https://instagram.com/',
    vk: 'https://vk.com/',
  },
];
