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
    src: '/images/gallery/work-01.svg',
    thumb: '/images/gallery/work-01-thumb.svg',
    alt: 'Модельная стрижка с переходом',
    category: 'haircut',
    aspectRatio: '4:3',
    width: 800,
    height: 600,
  },
  {
    id: 'gallery-02',
    src: '/images/gallery/work-02.svg',
    thumb: '/images/gallery/work-02-thumb.svg',
    alt: 'Моделирование бороды',
    category: 'beard',
    aspectRatio: '3:2',
    width: 900,
    height: 600,
  },
  {
    id: 'gallery-03',
    src: '/images/gallery/work-03.svg',
    thumb: '/images/gallery/work-03-thumb.svg',
    alt: 'Бритьё опасной бритвой',
    category: 'shave',
    aspectRatio: '1:1',
    width: 600,
    height: 600,
  },
  {
    id: 'gallery-04',
    src: '/images/gallery/work-04.svg',
    thumb: '/images/gallery/work-04-thumb.svg',
    alt: 'Интерьер барбершопа',
    category: 'interior',
    aspectRatio: '16:9',
    width: 800,
    height: 450,
  },
  {
    id: 'gallery-05',
    src: '/images/gallery/work-05.svg',
    thumb: '/images/gallery/work-05-thumb.svg',
    alt: 'Классическая стрижка',
    category: 'haircut',
    aspectRatio: '4:3',
    width: 800,
    height: 600,
  },
  {
    id: 'gallery-06',
    src: '/images/gallery/work-06.svg',
    thumb: '/images/gallery/work-06-thumb.svg',
    alt: 'Укладка бороды',
    category: 'beard',
    aspectRatio: '3:2',
    width: 900,
    height: 600,
  },
  {
    id: 'gallery-07',
    src: '/images/gallery/work-07.svg',
    thumb: '/images/gallery/work-07-thumb.svg',
    alt: 'Рабочее место барбера',
    category: 'interior',
    aspectRatio: '4:3',
    width: 800,
    height: 600,
  },
  {
    id: 'gallery-08',
    src: '/images/gallery/work-08.svg',
    thumb: '/images/gallery/work-08-thumb.svg',
    alt: 'Королевское бритьё',
    category: 'shave',
    aspectRatio: '3:2',
    width: 900,
    height: 600,
  },
  {
    id: 'gallery-09',
    src: '/images/gallery/work-09.svg',
    thumb: '/images/gallery/work-09-thumb.svg',
    alt: 'Стрижка машинкой с переходом',
    category: 'haircut',
    aspectRatio: '1:1',
    width: 600,
    height: 600,
  },
  {
    id: 'gallery-10',
    src: '/images/gallery/work-10.svg',
    thumb: '/images/gallery/work-10-thumb.svg',
    alt: 'Атмосфера барбершопа Vegas',
    category: 'interior',
    aspectRatio: '16:9',
    width: 800,
    height: 450,
  },
  {
    id: 'gallery-11',
    src: '/images/gallery/work-11.svg',
    thumb: '/images/gallery/work-11-thumb.svg',
    alt: 'Окантовка бороды',
    category: 'beard',
    aspectRatio: '4:3',
    width: 800,
    height: 600,
  },
  {
    id: 'gallery-12',
    src: '/images/gallery/work-12.svg',
    thumb: '/images/gallery/work-12-thumb.svg',
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
