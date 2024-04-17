<template>
	<div>
		<div class="text-start" v-if="label !== ''">
			<label class="label" style="font-weight: 600;">{{label}}</label>
		</div>
		<input
			:type="type"
			:name="name"
			:id="id"
			:class="'form-control '+extraClass"
			:placeholder="placeholder"
			:autocomplete="autocomplete"
			:disabled="disabled"
			v-model="inputModel"
		>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'InputFormComponent',
		props:{
			label:{
				type:String,
				default: ''
			},
			placeholder:String,
			type:String,
			id:String,
			name:String,
			extraClass:{
				type:String,
				default:''
			},
			autocomplete:{
				type:String,
				default:'off'
			},
			value:{
				type:String,
				default:'',
			},
			disabled:{
				type:Boolean,
				default:false
			},
		},

		computed:{
			inputModel:{
				get(){
					return this.value;
				},
				set(newValue){
					this.$emit("input",newValue);
				}
			}
		}
	}
</script>