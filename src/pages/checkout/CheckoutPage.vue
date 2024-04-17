<template>
	<LayoutGuest>
		<template v-slot:body>
			<div class="card">
				<div class="card-header">
					<div class="w-100 d-flex justify-content-between">
						<div><h3>Checkout Proccess</h3></div>
					</div>
				</div>
				<div class="card-body text-start">
					<div class="w-100 d-flex flex-wrap">
						<div class="col-12 col-md-4 col-lg-4">
							<div class="w-100">
								<label>
									<input type="radio" name="payment-type" :value="payment_type_cash" @change="(evt) => payment_type_default = evt.target.value">
									Efectivo
								</label>				
							</div>
							<div class="w-100">
								<label>
									<input type="radio" name="payment-type" :value="payment_type_card" @change="(evt) => payment_type_default = evt.target.value">
									Tarjeta
								</label>
								<div class="p-4" v-if="payment_type_default == payment_type_card">
									<PaymentFormComponent/>
								</div>
							</div>
							<div class="w-100">
								<label>
									<input type="radio" name="payment-type" :value="payment_type_later" @change="(evt) => payment_type_default = evt.target.value">
									Apartar
								</label>
								<div class="p-2" v-if="payment_type_default == payment_type_later">
									<span class="fw-bold text-danger">Importante:</span> <span class="text-danger">Solo se guardará durante 30 minutos</span>
								</div>
							</div>

							<div class="w-100 d-flex pt-5">
								<div class="col-12 col-md-8 col-lg-8">
									<ButtonComponent name="Checkout" @onClick="onCheckout"/>
								</div>
							</div>
						</div>
						<div class="col-12 col-md-8 col-lg-8" v-if="flight">
							<div class="card mb-2 cursor-pointer shadow p-3 bg-white rounded custom-card relative">
								<div class="card-body">
									<div class="d-flex flex-wrap">
										<div class="col-12 col-md-4 col-lg-4">
											<div class="pb-3">
												<span class="h4">{{flight.date}}</span>
											</div>
											<div class="d-flex justify-content-between">
												<div>
													<div class="w-100 text-start">
														<span>{{flight.time}}</span>
													</div>
													<div class="w-100 text-start">
														<small class="text-uppercase" v-if="flight.from">{{flight.from.code}}</small>
													</div>
												</div>
												<div> <span class=""> ---------------- </span> </div>
												<div>
													<div class="w-100 text-end">
														<span>{{flight.arrival_time}}</span>
													</div>
													<div class="w-100 text-end">
														<small class="text-uppercase" v-if="flight.to">{{flight.to.code}}</small>
													</div>              
												</div>
											</div>
										</div>

										<div class="col-12 col-md-4 col-lg-4 text-center">
											<div>
												<span class="h4 text-danger">{{flight.duration}}</span>
											</div>
											<div><span class="badge badge-info bg-primary h4" v-if="flight.type">{{flight.type.name}}</span></div>
										</div>

										<div class="col-12 col-md-4 col-lg-4">
											<div class="w-100 text-end">
												<span class="h4 text-success fw-bold">$ {{flight.price}}</span> <span> / 1</span>
											</div>
										</div>
									</div>

									<div class="pt-3">
										<div class="d-flex " v-for="item, index in data.form.passengers" :key="index">
											<div class="col-2">
												<span class="fw-bold">{{item.name}}</span>
											</div>

											<div class="col-2 text-center">
												<span>x</span>
											</div>

											<div class="col-2 text-start">
												<span>{{item.value}}</span>
											</div>
										</div>
									</div>

									<div class="pt-3 d-flex flex-wrap">
										<div class="d-flex flex-wrap" v-for="item, index in data.form.seats" :key="index">
											<div class="pr-1">
												<span class="badge badge-info h4 bg-success">{{item}}</span>
											</div>
										</div>
									</div>
								</div>
								<div class="w-100 d-flex pt-4 text-end">
									<div class="pr-2"><span class="h4">Total: </span> </div>
									<div><span class="h5">$ {{getTotal}} </span> </div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
	</LayoutGuest>
</template>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script type="text/javascript" src="https://openpay.s3.amazonaws.com/openpay.v1.min.js"></script>
<script type='text/javascript' src="https://openpay.s3.amazonaws.com/openpay-data.v1.min.js"></script>
<script type="text/javascript">
    import $ from 'jquery';
	import PaymentFormComponent from '@/components/checkout/PaymentFormComponent.vue';
	import ButtonComponent from '@/components/common/ButtonComponent';
	import LayoutGuest from '@/layouts/LayoutGuest.vue';

	import FlightService from '@/services/customer/flight-service';

	export default{
		name:'CheckoutPage',
		components:{
			PaymentFormComponent,
			ButtonComponent,
			LayoutGuest,
		},		

		data(){
			return{
				payment_type_cash: 1,
				payment_type_card:2,
				payment_type_later:3,
				payment_type_default:this.payment_type_cash,

				flight:{},
				data:{},
				flightService: new FlightService(),
			}
		},

		computed:{
			getTotal(){
				if(this.data.form && typeof(this.flight) !== "undefined"){
					const totalPassengers = this.data.form.passengers.reduce((total, passenger) => total + passenger.value, 0);
					return totalPassengers * (this.flight.price).replaceAll(",","");
				}
				return 0;
			}
		},

		mounted(){
			this.getInfo();
		},

		methods:{
			getInfo(){
				let data = JSON.parse(localStorage.getItem("flight"));
				this.data = data;
				this.flightGetById();
			},

			flightGetById(){
				this.flightService.getById(this.data.flight.id,(response) => {
					this.flight = response.data;
				},(error) => {
					console.log(error)
				});
			},

			flightStore(){
				const data = {
					id:this.data.flight.id,
					passengers:this.data.form.passengers,
					seats:this.data.form.seats,
					payment_method:this.payment_type_default
				};
				this.flightService.store(data,(response) => {
					if(response.success){
						localStorage.removeItem('flight');
						alert("Reserva generada con exito! # Confirmacion: "+ response.data.id);
						this.$router.push("/home");
					}
				},(error) => {
					console.log(error)
				});
			},			

			paymentTypeCard(){
				$(document).ready(function() {
					OpenPay.setId('mzdtln0bmtms6o3kck8f');
					OpenPay.setApiKey('pk_f0660ad5a39f4912872e24a7a660370c');
					var deviceSessionId = OpenPay.deviceData.setup("payment-form", "deviceIdHiddenFieldName");
					// OPENPAY Y DOWN
				});
			},

			onCheckout(){
				if(this.payment_type_default == this.payment_type_cash){
					this.flightStore();
				}else if(this.payment_type_default == this.payment_type_cash){
						this.paymentTypeCard();
						$("#pay-button").prop( "disabled", true);
						OpenPay.token.extractFormAndCreate('payment-form', (response) => {
							var token_id = response.data.id;
							$('#token_id').val(token_id);
							$('#payment-form').submit();
						}, (error) => {
						console.log(error);
						});
				}else{
					this.flightStore();
				}
			},
		}
	}
</script>