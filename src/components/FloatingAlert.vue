<template>
	<v-snackbar v-model="snackbar" :color="type">
		{{ message }}
	</v-snackbar>
</template>

<script>
export default {
    props: ["show", "message", "type"],
    data(){
        return {
            snackbar: false,
        }
    },
    watch: {
        show(val){
            this.snackbar = val;
        }
    },
};
</script>

<style>
</style>