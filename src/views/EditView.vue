<template>
	<section class="edit">
		<input
			class="edit__input"
			v-model="temperature"
			type="number"
			step="0.01"
		/>
		<button class="add" @click="saveList">Save</button>
		<button class="cancel" @click="showCancelDialog = true">Cancel</button>
		<button class="delete" @click="showConfirmDialog = true" v-if="isEditing">
			Delete
		</button>
		<DialogUi
			v-if="showConfirmDialog"
			@confirm="deleteLists"
			@cancel="showConfirmDialog = false"
		>
			Are you sure you want to delete this list?
		</DialogUi>
		<DialogUi
			v-if="showCancelDialog"
			@confirm="$router.push('/')"
			@cancel="showCancelDialog = false"
		>
			Are you sure you want to cancel this list?
		</DialogUi>
	</section>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue';
	import { useRouter, useRoute } from 'vue-router';
	import { useListStore } from '@/stores/list';
	import { storeToRefs } from 'pinia';
	import { type List } from '@/types/list';
	import DialogUi from '@/common/ui/DialogUi.vue';

	// route and store
	const { lists } = storeToRefs(useListStore());
	const { addList, updateList, deleteList } = useListStore();
	const router = useRouter();
	const route = useRoute();

	const temperature = ref<number>(0);
	const showConfirmDialog = ref<boolean>(false);
	const showCancelDialog = ref<boolean>(false);
	const isEditing = computed<boolean>(() => !!route.params.listId);

	onMounted(fetchList);

	function fetchList() {
		const listId: number = +route.params.listId;
		if (listId) {
			const list: List | undefined = lists.value.find(
				(list: List) => list.id === listId
			);
			temperature.value = list?.temperature || 0;
		}
	}

	function saveList() {
		const newLists: List = {
			id: isEditing.value ? +route.params.listId : Date.now(),
			temperature: temperature.value,
		};
		if (isEditing.value) {
			updateList(newLists);
		} else {
			addList(newLists);
		}
		router.push('/');
	}

	function deleteLists() {
		const listId: number = +route.params.listId;
		if (listId) {
			deleteList(listId);
		}
		router.push('/');
	}
</script>

<style scoped>
	.edit {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.edit__input {
		margin-bottom: 20px;
	}
</style>
