import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { type List } from '@/types/list';

export const useListStore = defineStore('list', () => {
	const lists = useLocalStorage<List[]>('ek-list', []);

	const addList = (list: List) => {
		lists.value.push(list);
	};

	const updateList = (list: List) => {
		const index = lists.value.findIndex(r => r.id === list.id);
		if (index !== -1) {
			lists.value[index] = list;
		}
	};

	const deleteList = (listId: number) => {
		lists.value = lists.value.filter(r => r.id !== listId);
	};

	return { lists, addList, updateList, deleteList };
});
