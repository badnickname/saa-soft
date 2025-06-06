<script setup lang="ts">
import type { Account } from '~/types/account';
import Row from '~/components/row.vue';
import { useStore } from '~/store';

const store = useStore();

const counter = ref(1);

onMounted(() => {

  const d = localStorage.getItem('accounts');
  if (!d) return;
  store.accounts = JSON.parse(d);

})

const created = ref<Account[]>([]);
const data = computed(() => [...store.accounts.map(x => ({...x, labels: x.labels.map(y => y.text).join('; ')})), ...created.value])

function add() {
  store.counter += 1;
  created.value.push({
    id: store.counter,
    labels: '',
    type: 'LDAP',
    login: '',
    password: ''
  });
}

function remove(id: number) {
  store.accounts = store.accounts.filter(x => x.id !== id);
  localStorage.setItem('accounts', JSON.stringify(store.accounts));
}

function save(account: Account) {
  const exist = store.accounts.find(x => x.id === account.id);
  if (exist) {
    Object.assign(exist, {...account, labels: account.labels.split('; ').map(y => ({ text: y})) });
  } else {
    store.accounts.push({...account, labels: account.labels.split('; ').map(y => ({ text: y})) });
  }
  created.value = created.value.filter(x => x.id !== account.id);
  localStorage.setItem('accounts', JSON.stringify(store.accounts));
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="w-full flex justify-between gap-5">
        <h1 class="text-center text-3xl">
          Учетные записи
        </h1>
        <UButton class="cursor-pointer" @click="add()">
          <span>Добавить</span>
          <Icon name="mingcute:add-fill"/>
        </UButton>
      </div>
    </template>
    <div class="mt-5">
      <UAlert color="neutral" title="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;" icon="mingcute:alert-octagon-line" />
    </div>
    <div class="mt-5 h-70 p-5 overflow-y-scroll">
      <table class="table-auto table w-full">
        <thead class="text-left">
        <tr>
          <th class="py-2 border-b-1 w-auto">Метки</th>
          <th class="border-b-1 w-30">Тип</th>
          <th class="border-b-1 w-30">Логин</th>
          <th class="border-b-1 w-30">Пароль</th>
          <th class="border-b-1 w-10"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(account, i) in data" :key="account.id" :class="{ 'bg-stone-200': i % 2 === 0 }">
          <Row :account="account" @delete="remove" @save="save" />
        </tr>
        </tbody>
      </table>
    </div>
  </UCard>
</template>

<style scoped>

</style>
