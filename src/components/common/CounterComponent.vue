<template>
	<div class="card">
		<div class="card-body p-0 m-0">
			<div class="d-flex">
				<div class="col-4 cursor-pointer" @click="remOne">
					<span class="h5"> - </span>
				</div>

				<div class="col-3">
					<span class="h6">{{counter}}</span>
				</div>

				<div class="col-4 cursor-pointer" @click="addOne">
					<span class="h5"> + </span>
				</div>
			</div>			
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'CounterComponent',
		// props:{
		// 	label:{
		// 		type:String,
		// 		default: ''
		// 	},
		// 	placeholder:String,
		// 	type:String,
		// 	id:String,
		// 	name:String,
		// 	extraClass:{
		// 		type:String,
		// 		default:''
		// 	},
		// 	autocomplete:{
		// 		type:String,
		// 		default:'off'
		// 	},
		// 	value:{
		// 		type:String,
		// 		default:'',
		// 	},
		// 	disabled:{
		// 		type:Boolean,
		// 		default:false
		// 	},
		// },

		props:{
			limit:{
				type:Number,
				default:5
			}
		},

		data(){
			return{
				counter:0,
			}
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
		},

		methods:{
			addOne(){
				if(this.isValid()){
					this.counter++;
				}
				this.$emit("value",this.counter);
			},

			remOne(){
				if(this.counter > 0){
					this.counter--;
				}
				this.$emit("value",this.counter);
			},

			isValid(){
				return this.counter < this.limit;
			}

		}
	}
</script>