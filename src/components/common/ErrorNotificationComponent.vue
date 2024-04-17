<template>
	<div v-if="errors.length > 0" class="alert alert-danger" role="alert">
		<div class="text-start" v-for="error, index in errors" :key="index">{{error}}</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:{
			errors:{
				type:Array,
				required:true,
			}
		}
	}
</script>
