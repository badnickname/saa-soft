<template>
  <div class="flex flex-col h-screen w-full justify-center items-center p-5">
    <div class="w-3/4">
      <main class="align-middle w-full">
        <RouterView />
      </main>
    </div>
  </div>
  <div class="flex w-screen px-5 text-stone-50 shadow-md text-xl absolute top-0">
    <UNavigationMenu highlight :items="items" class="w-full justify-center" />
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '#ui/components/NavigationMenu.vue';

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Главная',
    to: '/',
    class: 'hover:underline'
  },
  {
    label: 'Учетные записи',
    to: '/accounts'
  }
])
</script>
