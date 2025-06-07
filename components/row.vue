<script setup lang="ts">
import type { Account } from '~/types/account';

const props = defineProps({
  account: { type: Object as PropType<Account>, required: true }
})

const emit = defineEmits(['delete', 'save'])

const options: Account['type'][] = ['LDAP', 'Локальная'];

function isValidLabels(text: string) {
  if (text.length > 50) return false;
  return /^((\w*); )*(\w*)$/.test(text);
}

function isPasswordValid(text: string) {
  return text.length < 100 && Boolean(text.length);
}

function remove(id: number) {
  emit('delete', id);
}

async function next(i: number) {
  await nextTick();
  await nextTick();
  if (i === 1) {
    (td[i] as any)?.value?.children[0]?.focus();
    return;
  }
  (td[i] as any)?.value?.children[0]?.children[0]?.focus();
}

async function onBlur(i: number) {
  focused.value[i] = true;
  await nextTick();
  props.account.password = props.account.type === 'LDAP' ? props.account.password : '';
  emit('save', props.account);
}

const td = [
  undefined,
  useTemplateRef<HTMLElement>('td1'),
  useTemplateRef<HTMLElement>('td2'),
  useTemplateRef<HTMLElement>('td3')
];

const focused = ref([
    false,
    false,
    false,
    false
])

</script>

<template>
  <td class="py-2 px-2">
    <UInput v-model="account.labels" :color="!isValidLabels(account.labels) ? 'error' : undefined" :highlight="!isValidLabels(account.labels)" autocomplete="off" class="w-full" @keydown.enter="next(1)" @blur="onBlur(0)" />
  </td>
  <td class="pr-2" ref="td1">
    <USelect v-model="account.type" :items="options" class="w-30" @update:modelValue="account.password = ''; next(2); " @blur="onBlur(1)" />
  </td>
  <td class="pr-2" ref="td2" :colspan="account.type === 'LDAP' ? 1 : 2">
    <UInput v-model="account.login" :color="focused[2] && !isPasswordValid(account.login) ? 'error' : undefined" :highlight="focused[2] && !isPasswordValid(account.login)" autocomplete="off" @keydown.enter="account.type === 'Локальная' ? $event.target.blur() : next(3)" @blur="onBlur(2)" />
  </td>
  <td v-if="account.type === 'LDAP'" class="pr-2" ref="td3">
    <UInput v-model="account.password" :color="focused[3] && !isPasswordValid(account.password) ? 'error' : undefined" :highlight="focused[3] && !isPasswordValid(account.password)" type="password" @keydown.enter="$event.target.blur()" autocomplete="off" @blur="onBlur(3)" />
  </td>
  <td>
    <UButton class="cursor-pointer" @click="remove(account.id)">
      <Icon name="mingcute:delete-line"/>
    </UButton>
  </td>
</template>

<style scoped>

</style>
