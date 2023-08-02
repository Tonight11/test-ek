<template>
	<div class="dialog">
		<div class="dialog-content">
			<p><slot /></p>
			<button class="confirm" @click="confirmAction">Confirm</button>
			<button class="cancel" @click="cancelAction">Cancel</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	const emit = defineEmits(['confirm', 'cancel']);

	function confirmAction() {
		emit('confirm');
	}

	function cancelAction() {
		emit('cancel');
	}
</script>

<style>
	.dialog {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0 10px;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.dialog-content {
		background-color: #2c2c2c;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 20px;
		border-radius: 8px;
	}
</style>
