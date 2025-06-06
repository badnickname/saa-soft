export type Account = {
	id: number;
	labels: string;
	type: 'LDAP' | 'Локальная';
	login: string;
	password: string;
}
