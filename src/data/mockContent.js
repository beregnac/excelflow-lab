export const CATALOG_PRODUCTS = [
  {
    id: 1,
    title: 'Excel Табель Про 2026',
    category: 'Шаблоны',
    price: 1490,
    rating: 4.9,
    tags: ['Новинка', 'Хит'],
    description: 'Автоматический учёт рабочего времени, переработок и отпусков с макросами.',
    gradient: 'from-indigo-500 to-violet-600',
    icon: 'table'
  },
  {
    id: 2,
    title: 'BI Дашборд Финансов',
    category: 'Аналитика',
    price: 2990,
    rating: 4.8,
    tags: ['Хит', 'Pro'],
    description: 'Интерактивный шаблон P&L и CashFlow отчётности с импортом из XLSX.',
    gradient: 'from-emerald-500 to-teal-600',
    icon: 'chart'
  },
  {
    id: 3,
    title: 'Конвертер XLSX → JSON API',
    category: 'Плагины',
    price: 1990,
    rating: 4.7,
    tags: ['Автоматизация'],
    description: 'Мгновенный парсинг прайс-листов и выгрузка в REST API по расписанию.',
    gradient: 'from-sky-500 to-blue-600',
    icon: 'code'
  },
  {
    id: 4,
    title: 'CRM-воронка в таблицах',
    category: 'Шаблоны',
    price: 1290,
    rating: 4.6,
    tags: ['Скидка'],
    description: 'Учёт сделок, KPI менеджеров и прогноз выручки на квартал.',
    gradient: 'from-amber-500 to-orange-600',
    icon: 'briefcase'
  },
  {
    id: 5,
    title: 'Складской учёт и остатки',
    category: 'Шаблоны',
    price: 1790,
    rating: 4.9,
    tags: ['Хит'],
    description: 'Контроль минимальных остатков, штрих-коды и автозаказ поставщикам.',
    gradient: 'from-fuchsia-500 to-pink-600',
    icon: 'box'
  },
  {
    id: 6,
    title: 'AI-валидатор таблиц',
    category: 'Плагины',
    price: 3490,
    rating: 5.0,
    tags: ['Новинка', 'Pro'],
    description: 'Поиск дублей, аномалий и пустых ячеек в больших книгах Excel.',
    gradient: 'from-purple-500 to-indigo-600',
    icon: 'sparkles'
  },
  {
    id: 7,
    title: 'Бюджет маркетинга 360',
    category: 'Аналитика',
    price: 2490,
    rating: 4.8,
    tags: ['Скидка'],
    description: 'ROMI, CAC и LTV по рекламным каналам с визуализацией трендов.',
    gradient: 'from-rose-500 to-red-600',
    icon: 'chart'
  },
  {
    id: 8,
    title: 'Пакет автоотчётов Email/Drive',
    category: 'Плагины',
    price: 2190,
    rating: 4.7,
    tags: ['Автоматизация', 'Pro'],
    description: 'Планировщик рассылки PDF и XLSX отчётов на почту и Google Диск.',
    gradient: 'from-cyan-500 to-sky-600',
    icon: 'cloud'
  }
]

export const LAB_LEVELS = [
  {
    level: 'Уровень 1',
    title: 'Начальный',
    badgeClass: 'ds-badge-success',
    tasks: [
      { id: '1.1', name: 'Карточка профиля', route: '/design-system#profile-card', tags: ['rounded-full', 'w-20 h-20', 'md:w-80'] },
      { id: '1.2', name: 'Навигационная панель', route: '/#navbar', tags: ['sticky top-0', 'backdrop-blur', 'hidden md:flex'] },
      { id: '1.3', name: 'Сетка карточек товаров', route: '/#products-grid', tags: ['aspect-square', 'grid-cols-1..4', 'hover:scale-105'] }
    ]
  },
  {
    level: 'Уровень 2',
    title: 'Средний',
    badgeClass: 'ds-badge-brand',
    tasks: [
      { id: '2.1', name: 'Hero-секция с градиентом', route: '/#hero', tags: ['bg-clip-text', 'blur-3xl', 'animate-pulse'] },
      { id: '2.2', name: 'Pricing-таблица', route: '/#pricing', tags: ['ring-2 ring-indigo-500', 'lg:scale-105', 'divide-y'] },
      { id: '2.3', name: 'Sidebar + контент', route: '/dashboard', tags: ['fixed inset-y-0 w-64', 'translate-x-*', 'overflow-y-auto'] },
      { id: '2.4', name: 'Форма регистрации', route: '/register', tags: ['peer-invalid:*', 'peer-focus:*', 'group'] }
    ]
  },
  {
    level: 'Уровень 3',
    title: 'Продвинутый',
    badgeClass: 'ds-badge-warning',
    tasks: [
      { id: '3.1', name: 'Мессенджер (макет)', route: '/messenger', tags: ['sticky bottom-0', 'overflow-y-auto', '[&::-webkit-scrollbar]:w-2'] },
      { id: '3.2', name: 'Kanban-доска', route: '/kanban', tags: ['snap-x snap-mandatory', 'min-w-[300px]', 'line-clamp-2'] },
      { id: '3.3', name: 'Комплексный лендинг', route: '/', tags: ['@apply', 'details group-open:*', 'snap-x'] },
      { id: '3.4', name: 'Dark mode с переключателем', route: '/', tags: ['darkMode: class', 'dark:bg-slate-900', 'transition-colors'] }
    ]
  },
  {
    level: 'Уровень 4',
    title: 'Экспертный',
    badgeClass: 'ds-badge-danger',
    tasks: [
      { id: '4.1', name: 'Дашборд аналитики', route: '/dashboard', tags: ['grid-cols-12', 'min-w-0 truncate', 'scrollbar-thin'] },
      { id: '4.2', name: 'Многошаговая форма', route: '/wizard', tags: ['has-[:checked]:*', 'data-[state=*]:*', 'aria-*'] },
      { id: '4.3', name: 'E-commerce каталог с фильтрами', route: '/catalog', tags: ['@container', 'translate-y-full', 'animate-pulse'] },
      { id: '4.4', name: 'Дизайн-система на Tailwind', route: '/design-system', tags: ['@layer components', 'plugin', 'tailwind.config.js'] }
    ]
  }
]
