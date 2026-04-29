export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: 'haircut' | 'beard' | 'shave' | 'additional';
  hit: boolean;
  icon: string; // Lucide icon name
}

export const services: Service[] = [
  {
    id: 'mens-haircut',
    name: 'Мужская стрижка',
    description: 'Классическая или модельная стрижка с мытьём головы и укладкой',
    price: 1500,
    duration: 40,
    category: 'haircut',
    hit: true,
    icon: 'scissors',
  },
  {
    id: 'clipper-cut',
    name: 'Стрижка машинкой',
    description: 'Быстрая стрижка одной насадкой или с плавным переходом',
    price: 1000,
    duration: 20,
    category: 'haircut',
    hit: false,
    icon: 'shower-head',
  },
  {
    id: 'haircut-shaved-head',
    name: 'Стрижка + бритьё головы',
    description: 'Стрижка волос с последующим бритьём головы опасной бритвой',
    price: 2000,
    duration: 60,
    category: 'haircut',
    hit: false,
    icon: 'scissors',
  },
  {
    id: 'beard-shaping',
    name: 'Моделирование бороды',
    description: 'Придание формы бороде и усам с окантовкой опасной бритвой',
    price: 800,
    duration: 20,
    category: 'beard',
    hit: true,
    icon: 'spray-can',
  },
  {
    id: 'straight-razor-shave',
    name: 'Бритьё опасной бритвой',
    description: 'Классическое мокрое бритьё с горячим полотенцем и лосьоном',
    price: 1500,
    duration: 40,
    category: 'shave',
    hit: false,
    icon: 'rail-symbol',
  },
  {
    id: 'royal-shave',
    name: 'Королевское бритьё',
    description: 'Премиум-бритьё с распариванием, массажем лица и уходом',
    price: 2500,
    duration: 60,
    category: 'shave',
    hit: false,
    icon: 'sparkles',
  },
  {
    id: 'gray-camouflage',
    name: 'Камуфляж седины',
    description: 'Маскировка седых волос на висках и в бороде специальным составом',
    price: 1500,
    duration: 30,
    category: 'additional',
    hit: false,
    icon: 'palette',
  },
  {
    id: 'styling',
    name: 'Укладка',
    description: 'Укладка волос с использованием профессиональной косметики',
    price: 500,
    duration: 10,
    category: 'additional',
    hit: false,
    icon: 'wind',
  },
];

export const categoryLabels: Record<string, string> = {
  haircut: 'Стрижки',
  beard: 'Борода',
  shave: 'Бритьё',
  additional: 'Дополнительно',
};

export const serviceCategoryOrder = ['haircut', 'beard', 'shave', 'additional'];
