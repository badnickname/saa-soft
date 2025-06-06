import type { Account } from '~/types/account';

export const useStore = defineStore('store', () => {
	const accounts = ref<(Omit<Account, 'labels'> & { labels: {text: string}[] })[]>([]);
	const counter = ref(1);
	return { accounts, counter };
});
