<template>
  <!-- Task 2.2: Pricing Table (Basic / Pro Popular / Enterprise) with ring-2 ring-indigo-500, lg:scale-105, divide-y, space-y-* -->
  <section id="pricing" class="ds-section bg-slate-50/45 dark:bg-slate-950/50" aria-labelledby="pricing-heading">
    <div class="ds-container">
      <div class="mx-auto max-w-2xl text-center space-y-3 mb-12">
        <span class="ds-badge ds-badge-brand">Тарифные планы</span>
        <h2 id="pricing-heading" class="ds-h2">Прозрачные тарифы для команд любого размера</h2>
        <p class="ds-body">Выберите подходящий план для работы с Excel-данными, аналитикой и автоматизацией.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        <article
          v-for="plan in plans"
          :key="plan.name"
          class="relative flex flex-col rounded-2xl border bg-white p-6 sm:p-8 shadow-soft transition-all duration-300 dark:bg-slate-900"
          :class="
            plan.popular
              ? 'border-indigo-500 ring-2 ring-indigo-500 lg:scale-105 shadow-xl z-10'
              : 'border-slate-200 dark:border-slate-800 hover:-translate-y-1'
          "
        >
          <!-- Popular Badge -->
          <div
            v-if="plan.popular"
            class="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow"
          >
            Popular
          </div>

          <div class="space-y-2 pb-6">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">{{ plan.name }}</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">{{ plan.description }}</p>
            <div class="pt-3 flex items-baseline gap-1.5">
              <span class="inline-flex items-baseline gap-1.5 text-4xl font-extrabold text-slate-900 dark:text-white">
                {{ plan.price }} <BynSymbol />
              </span>
              <span class="text-sm text-slate-500 dark:text-slate-400">{{ plan.period }}</span>
            </div>
          </div>

          <!-- Feature list divided by divide-y & space-y-* -->
          <ul class="flex-1 divide-y divide-slate-100 dark:divide-slate-800 border-t border-slate-100 dark:border-slate-800">
            <li
              v-for="feature in plan.features"
              :key="feature.text"
              class="flex items-center gap-3 py-3 text-sm"
              :class="feature.included ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500 line-through'"
            >
              <span class="text-base shrink-0" aria-hidden="true">{{ feature.included ? '✅' : '❌' }}</span>
              <span>{{ feature.text }}</span>
            </li>
          </ul>

          <div class="pt-6 mt-2">
            <router-link
              to="/wizard"
              class="w-full ds-btn ds-btn-lg"
              :class="plan.popular ? 'ds-btn-primary' : 'ds-btn-outline'"
            >
              Выбрать {{ plan.name }}
            </router-link>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import BynSymbol from './BynSymbol.vue'

const plans = [
  {
    name: 'Basic',
    price: '0',
    period: '/ месяц',
    description: 'Для личного использования и быстрого парсинга таблиц.',
    popular: false,
    features: [
      { text: 'Загрузка .xlsx и .xls до 5 МБ', included: true },
      { text: 'Редактирование и пагинация строк', included: true },
      { text: 'Dark Mode и адаптивная таблица', included: true },
      { text: 'Командная Kanban-доска', included: false },
      { text: 'Автоэкспорт на Email и Google Диск', included: false }
    ]
  },
  {
    name: 'Pro',
    price: '1 490',
    period: '/ месяц',
    description: 'Оптимально для аналитиков и растущих продуктовых команд.',
    popular: true,
    features: [
      { text: 'Безлимитный импорт Excel-книг', included: true },
      { text: 'Дашборд аналитики и тепловые карты', included: true },
      { text: 'Командная Kanban-доска и Мессенджер', included: true },
      { text: 'Автоэкспорт на Email и Google Диск', included: true },
      { text: 'Выделенный SLA и SSO', included: false }
    ]
  },
  {
    name: 'Enterprise',
    price: '4 990',
    period: '/ месяц',
    description: 'Полный контроль данных, кастомная дизайн-система и API.',
    popular: false,
    features: [
      { text: 'Всё из тарифа Pro', included: true },
      { text: 'Неограниченное число пользователей', included: true },
      { text: 'Аудит действий и роли доступа', included: true },
      { text: 'REST API и вебхуки интеграций', included: true },
      { text: 'Выделенный SLA 99.9% и SSO', included: true }
    ]
  }
]
</script>
