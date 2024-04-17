<template>
	<button
		:id="id"
		:class="'w-100 btn '+ className"
		@click="$emit('onClick')"
		:disabled="disabled">
		{{name}}
	</button>
</template>
<script type="text/javascript">
	export default{
		name:'ButtonComponent',
		props:{
			name:{
				type:String
			},
			id:{
				type:String,
				default:'',
			},

			className:{
				type:String,
				default: 'btn-primary'
			},

			disabled:{
				type:Boolean,
				default:false
			}
		},
	}
</script>