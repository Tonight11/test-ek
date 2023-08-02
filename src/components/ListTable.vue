<template>
	<div class="table-container" v-if="lists.length">
		<table class="table">
			<thead>
				<tr>
					<th>ID</th>
					<th>Temperature</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="list in lists" :key="list.id">
					<td>{{ list.id }}</td>
					<td>{{ list.temperature }}</td>
					<td class="table__action">
						<button @click="editlist(list.id)">Edit</button>
						<button class="delete" @click="$emit('confirmDelete', list.id)">
							Delete
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div v-else>Список пустой...</div>
</template>

<script setup lang="ts">
	import { useListStore } from '@/stores/list';
	import { storeToRefs } from 'pinia';
	import { useRouter } from 'vue-router';

	defineEmits(['confirmDelete']);

	const router = useRouter();
	const { lists } = storeToRefs(useListStore());

	function editlist(listId: number) {
		router.push(`/edit/${listId}`);
	}
</script>

<style scoped>
	.table-container {
		overflow-x: auto;
	}
	.table {
		width: 100%;
	}
	.table th:last-child {
		text-align: center;
	}
	.table__action {
		display: flex;
		gap: 20px;
		justify-content: center;
	}

	td,
	th {
		white-space: nowrap;
	}

	@media screen and (max-width: 600px) {
		tr {
			margin-bottom: 10px;
			border-radius: 4px;
		}

		th,
		td {
			padding: 10px;
			text-align: left;
		}

		.table__action {
			white-space: nowrap;
		}
	}
</style>
