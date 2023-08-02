<script setup lang="ts">
	import TheHeader from './components/TheHeader.vue';
</script>

<template>
	<div class="app">
		<TheHeader />
		<main>
			<router-view></router-view>
		</main>
	</div>
</template>

<style scoped></style>
