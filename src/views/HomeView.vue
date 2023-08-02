<template>
	<main>
		<button class="main-btn" @click="goToAddlist">Добавить новую температуру</button>
		<ListTable @confirm-delete="confirmDelete" />
		<DialogUi
			v-if="showConfirmDialog"
			@confirm="deletelist"
			@cancel="cancelDelete"
		>
			Вы и вправду хотите удалить запись?
		</DialogUi>
	</main>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';
	import { useListStore } from '@/stores/list';

	import DialogUi from '@/common/ui/DialogUi.vue';
	import ListTable from '@/components/ListTable.vue';

	const router = useRouter();
	const { deleteList } = useListStore();

	const showConfirmDialog = ref(false);
	const listToDelete = ref<null | number>(null);

	function goToAddlist() {
		router.push('/edit');
	}

	function deletelist() {
		if (listToDelete.value !== null) {
			deleteList(listToDelete.value);
			listToDelete.value = null;
			showConfirmDialog.value = false;
		}
	}

	function confirmDelete(listId: number) {
		listToDelete.value = listId;
		showConfirmDialog.value = true;
	}

	function cancelDelete() {
		listToDelete.value = null;
		showConfirmDialog.value = false;
	}
</script>

<style>
	.main-btn {
		width: 100%;
		margin-bottom: 20px;
		font-size: 18px;

		padding: 20px;
	}
</style>
