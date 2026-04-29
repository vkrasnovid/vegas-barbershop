export interface GalleryImage {
  id: string;
  src: string;
  thumb: string;
  alt: string;
  category: 'haircut' | 'beard' | 'shave' | 'interior';
  aspectRatio: '4:3' | '3:2' | '1:1' | '16:9';
  width: number;
  height: number;
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'gallery-01',
    src: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=800&h=600&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=400&h=300&fit=crop',
    alt: 'Модельная стрижка с переходом',
    category: 'haircut',
    aspectRatio: '4:3',
    width: 800,
    height: 600,
  },
  {
    id: 'gallery-02',
    src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665913?w=900&h=600&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1621605815971-fbc98d665913?w=450&h=300&fit=crop',
    alt: 'Моделирование бороды',
    category: 'beard',
    aspectRatio: '3:2',
    width: 900,
    height: 600,
  },
  {
    id: 'gallery-03',
    src: 'https://images.unsplash.com/photo-1585747861115-1c0c2c1b9c1e?w=600&h=600&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1585747861115-1c0c2c1b9c1e?w=300&h=300&fit=crop',
    alt: 'Бритьё опасной бритвой',
    category: 'shave',
    aspectRatio: '1:1',
    width: 600,
    height: 600,
  },
  {
    id: 'gallery-04',
    src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=450&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=225&fit=crop',
    alt: 'Интерьер барбершопа',
    category: 'interior',
    aspectRatio: '16:9',
    width: 800,
    height: 450,
  },
  {
    id: 'gallery-05',
    src: 'https://images.unsplash.com/photo-1599351431202-1e0f013802ce?w=800&h=600&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1599351431202-1e0f013802ce?w=400&h=300&fit=crop',
    alt: 'Классическая стрижка',
    category: 'haircut',
    aspectRatio: '4:3',
    width: 800,
    height: 600,
  },
  {
    id: 'gallery-06',
    src: 'https://images.unsplash.com/photo-1593702288056-99e9b8c8f4bc?w=900&h=600&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1593702288056-99e9b8c8f4bc?w=450&h=300&fit=crop',
    alt: 'Укладка бороды',
    category: 'beard',
    aspectRatio: '3:2',
    width: 900,
    height: 600,
  },
  {
    id: 'gallery-07',
    src: 'https://images.unsplash.com/photo-1503951914875-452cb67e58f5?w=800&h=600&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1503951914875-452cb67e58f5?w=400&h=300&fit=crop',
    alt: 'Рабочее место барбера',
    category: 'interior',
    aspectRatio: '4:3',
    width: 800,
    height: 600,
  },
  {
    id: 'gallery-08',
    src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=900&h=600&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=450&h=300&fit=crop',
    alt: 'Королевское бритьё',
    category: 'shave',
    aspectRatio: '3:2',
    width: 900,
    height: 600,
  },
  {
    id: 'gallery-09',
    src: 'https://images.unsplash.com/photo-1567894340315-735d7c361db7?w=600&h=600&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1567894340315-735d7c361db7?w=300&h=300&fit=crop',
    alt: 'Стрижка машинкой с переходом',
    category: 'haircut',
    aspectRatio: '1:1',
    width: 600,
    height: 600,
  },
  {
    id: 'gallery-10',
    src: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b0?w=800&h=450&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b0?w=400&h=225&fit=crop',
    alt: 'Атмосфера барбершопа Vegas',
    category: 'interior',
    aspectRatio: '16:9',
    width: 800,
    height: 450,
  },
  {
    id: 'gallery-11',
    src: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=800&h=600&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=400&h=300&fit=crop',
    alt: 'Окантовка бороды',
    category: 'beard',
    aspectRatio: '4:3',
    width: 800,
    height: 600,
  },
  {
    id: 'gallery-12',
    src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665913?w=900&h=600&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1621605815971-fbc98d665913?w=450&h=300&fit=crop',
    alt: 'Премиум уход за волосами',
    category: 'haircut',
    aspectRatio: '3:2',
    width: 900,
    height: 600,
  },
];

export const galleryCategories = [
  { id: 'all', label: 'Все' },
  { id: 'haircut', label: 'Стрижки' },
  { id: 'beard', label: 'Борода' },
  { id: 'shave', label: 'Бритьё' },
  { id: 'interior', label: 'Интерьер' },
];
