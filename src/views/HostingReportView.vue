<template>
  <DashboardLayout>
    <div class="space-y-8 max-w-6xl">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 dark:border-slate-800">
        <div>
          <span class="ds-badge ds-badge-brand mb-2">Задания 1 &amp; 2 · Публикация и Хостинг</span>
          <h1 class="ds-h2">Интеграция AdSlot и сравнение бесплатных хостингов (2026)</h1>
          <p class="ds-body mt-1">
            Публикация проекта на GitHub Pages / Cloudflare Pages, интерактивный рекламный плейсхолдер и анализ 5 хостинг-платформ.
          </p>
        </div>
        <a
          href="https://beregnac.github.io/excelflow-lab/"
          target="_blank"
          rel="noopener noreferrer"
          class="ds-badge ds-badge-success shrink-0 hover:underline"
        >
          Live: beregnac.github.io/excelflow-lab ↗
        </a>
      </div>

      <!-- Task 1 Summary + Live AdSlot Demo -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-6" aria-labelledby="task1-heading">
        <div class="lg:col-span-7 ds-card space-y-4">
          <h2 id="task1-heading" class="ds-h3">Задание 1: Чеклист публикации и AdSlot.vue</h2>
          <ol class="space-y-2.5 text-sm text-slate-600 dark:text-slate-300 list-decimal pl-5">
            <li>
              <strong>Конфигурация Vite и Router:</strong> в <code class="text-xs">vite.config.js</code> задано <code class="text-xs">base: process.env.VITE_BASE_PATH || '/'</code>, а в <code class="text-xs">router/index.js</code> подключён <code class="text-xs">import.meta.env.BASE_URL</code>.
            </li>
            <li>
              <strong>Компонент <code class="text-xs">AdSlot.vue</code>:</strong> реализован на Tailwind CSS с пунктирной рамкой, светлым/тёмным фоном, идентификатором текста и пресетами (<code class="text-xs">banner</code>, <code class="text-xs">sidebar</code>, <code class="text-xs">square</code>) + кастомными <code class="text-xs">width</code> / <code class="text-xs">height</code>.
            </li>
            <li>
              <strong>Размещение в интерфейсе:</strong> блок встроен на <router-link to="/" class="text-brand-600 underline dark:text-brand-400">главную страницу</router-link>, в <router-link to="/catalog" class="text-brand-600 underline dark:text-brand-400">каталог</router-link> и в <router-link to="/design-system" class="text-brand-600 underline dark:text-brand-400">дизайн-систему</router-link>.
            </li>
            <li>
              <strong>CI/CD публикация:</strong> GitHub Actions (<code class="text-xs">.github/workflows/deploy.yml</code>) автоматически собирает <code class="text-xs">dist/</code> на <a href="https://beregnac.github.io/excelflow-lab/" target="_blank" rel="noopener noreferrer" class="text-brand-600 underline dark:text-brand-400">GitHub Pages</a>.
            </li>
          </ol>

          <div class="rounded-xl bg-slate-900 p-4 text-xs text-slate-200 overflow-x-auto scrollbar-thin">
            <pre><code>&lt;AdSlot size="banner" label="Рекламное место" /&gt;
&lt;AdSlot size="sidebar" width="300px" height="250px" label="Advertisement" /&gt;</code></pre>
          </div>
        </div>

        <div class="lg:col-span-5 ds-card flex flex-col justify-between gap-4">
          <div>
            <h3 class="ds-h3">Живой пример AdSlot</h3>
            <p class="ds-muted mt-1">Переключайте пресеты размеров прямо здесь:</p>
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              v-for="preset in ['banner', 'sidebar', 'square', 'fluid']"
              :key="preset"
              type="button"
              @click="selectedPreset = preset"
              class="ds-btn ds-btn-sm"
              :class="selectedPreset === preset ? 'ds-btn-primary' : 'ds-btn-outline'"
            >
              {{ preset }}
            </button>
          </div>

          <div class="flex items-center justify-center rounded-xl bg-slate-100/80 p-4 dark:bg-slate-950/60 overflow-hidden">
            <AdSlot :size="selectedPreset" label="Рекламное место" />
          </div>
        </div>
      </section>

      <!-- Task 2: Comparative Table -->
      <section class="ds-card space-y-4" aria-labelledby="task2-table-heading">
        <div>
          <span class="ds-badge ds-badge-brand mb-1.5">Задание 2 · Сравнительная таблица</span>
          <h2 id="task2-table-heading" class="ds-h3">Сравнение бесплатных хостингов статических сайтов (2026)</h2>
        </div>

        <div class="overflow-x-auto scrollbar-thin">
          <table class="w-full min-w-[820px] border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr class="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                <th class="p-3.5 font-bold">Параметр</th>
                <th class="p-3.5 font-bold text-brand-600 dark:text-brand-400">Cloudflare Pages</th>
                <th class="p-3.5 font-bold">GitHub Pages</th>
                <th class="p-3.5 font-bold">Netlify (Free)</th>
                <th class="p-3.5 font-bold">Vercel (Hobby)</th>
                <th class="p-3.5 font-bold">Render (Static)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              <tr v-for="row in comparisonRows" :key="row.param" class="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                <td class="p-3.5 font-semibold text-slate-900 dark:text-white">{{ row.param }}</td>
                <td class="p-3.5 bg-brand-50/30 font-medium text-slate-800 dark:bg-brand-950/20 dark:text-slate-100">{{ row.cf }}</td>
                <td class="p-3.5 text-slate-600 dark:text-slate-300">{{ row.gh }}</td>
                <td class="p-3.5 text-slate-600 dark:text-slate-300">{{ row.netlify }}</td>
                <td class="p-3.5 text-slate-600 dark:text-slate-300">{{ row.vercel }}</td>
                <td class="p-3.5 text-slate-600 dark:text-slate-300">{{ row.render }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Policy Warnings & Recommendation -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section class="ds-card border-rose-200 dark:border-rose-900/60 space-y-3" aria-labelledby="risks-heading">
          <span class="ds-badge ds-badge-danger">Риски политики</span>
          <h2 id="risks-heading" class="ds-h3">Где «бесплатный тариф + реклама» опасны</h2>
          <ul class="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>Vercel Hobby:</strong> строгий запрет на коммерческое использование — AdSense, партнёрские ссылки и приём платежей нарушают Hobby Terms.
            </li>
            <li>
              <strong>GitHub Pages:</strong> запрещено использовать для коммерческих транзакций и в качестве основной площадки для рекламы (серая зона при росте монетизации).
            </li>
            <li>
              <strong>Netlify Free:</strong> пул в 300 кредитов/мес (20 кредитов/ГБ трафика и 15 за прод-деплой) быстро исчерпывается при росте посещаемости с полной остановкой сайта.
            </li>
          </ul>
        </section>

        <section class="ds-card border-emerald-200 dark:border-emerald-900/60 space-y-3" aria-labelledby="rec-heading">
          <span class="ds-badge ds-badge-success">Рекомендация</span>
          <h2 id="rec-heading" class="ds-h3">Cloudflare Pages + альтернатива Render / GitHub Pages</h2>
          <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Для сценария «статический сайт на Vue + возможное размещение рекламы» оптимален <strong>Cloudflare Pages</strong>: условия <em>Self-Serve Subscription Agreement</em> не запрещают рекламу, статический трафик безлимитен, а 500 бесплатных сборок/мес полностью покрывают цикл разработки на Vite.
          </p>
          <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Полный аналитический отчёт объёмом 678 слов (без учёта таблицы) также сохранён в корне проекта в файле <code class="text-xs">HOSTING_REPORT.md</code>.
          </p>
        </section>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref } from 'vue'
import DashboardLayout from '@/components/DashboardLayout.vue'
import AdSlot from '@/components/AdSlot.vue'

const selectedPreset = ref('banner')

const comparisonRows = [
  {
    param: 'Трафик (в месяц)',
    cf: 'Безлимитный',
    gh: '100 ГБ (мягкий лимит), макс. 1 ГБ сайт',
    netlify: '300 кредитов/мес (20 кр./ГБ)',
    vercel: '100 ГБ (жёсткий лимит)',
    render: '100 ГБ на workspace'
  },
  {
    param: 'Сборки',
    cf: '500/мес, таймаут 20 мин',
    gh: '10/час (или Actions 2000 мин/мес)',
    netlify: '15 кр. за прод-деплой (PR бесплатно)',
    vercel: '100/день, таймаут 45 мин',
    render: '500 мин/мес на workspace'
  },
  {
    param: 'Коммерция',
    cf: 'Разрешено (кроме PCI карт)',
    gh: 'Запрещена (бизнес/SaaS)',
    netlify: 'Разрешено (кроме перепродажи)',
    vercel: 'Запрещено на Hobby',
    render: 'Разрешено'
  },
  {
    param: 'Реклама',
    cf: 'Разрешена без ограничений',
    gh: 'Серая зона (не как главная цель)',
    netlify: 'Допустима, нет чёткого пункта в ToS',
    vercel: 'Запрещена (AdSense = коммерция)',
    render: 'Допустима по AUP'
  },
  {
    param: 'Домен + SSL',
    cf: 'Да, бесплатно',
    gh: 'Да, Let’s Encrypt',
    netlify: 'Да, бесплатно',
    vercel: 'Да, бесплатно',
    render: 'Да, управляемый TLS'
  },
  {
    param: 'Git CI/CD',
    cf: 'GitHub / GitLab',
    gh: 'GitHub / Actions',
    netlify: 'GitHub / GitLab / Bitbucket',
    vercel: 'GitHub / GitLab / Bitbucket',
    render: 'GitHub / GitLab / Bitbucket'
  },
  {
    param: 'Сценарий',
    cf: 'Vue/Vite SPA с рекламой и высоким трафиком',
    gh: 'Документация и пет-проекты без бизнеса',
    netlify: 'Небольшие лендинги с редким деплоем',
    vercel: 'Личные учебные прототипы без монетизации',
    render: 'SPA рядом с сервисами Render'
  }
]
</script>
