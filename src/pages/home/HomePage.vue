<template>
  <LayoutGuest>
    <template v-slot:body>
      <ErrorNotificationComponent :errors="errors" v-if="errors.length > 0"/>
      <div class="card mb-4">
        <div class="card-body">
          <div class="d-flex py-4">
            <div class="col-12 col-md-2 col-lg-2">
              <ButtonComponent name="Pasajeros" className="btn-info text-white " @onClick="showPassengers = !showPassengers"/>
            </div>
          </div>
          <div class="w-100 pb-4" v-if="showPassengers">
            <div class="d-flex pb-1 align-items-center" v-for="item, key in users" :key="key">
              <div class="col-6 col-md-3 col-lg-3">
                <span>{{item.text}}</span>  
              </div>
              <div class="col-6 col-md-1 col-lg-1">
                <CounterComponent @value="(value) => setPassengers(item,value)"/>
              </div>
            </div>
          </div>
          <div class="d-flex flex-wrap align-items-center">
              <div class="col-12 col-md-3 col-lg-3">
                <SelectGroupComponent :items="address" name="Origen" @setValue="(value) => filterForm.from = value"/>
              </div>

              <div class="col-12 col-md-3 col-lg-3 px-3">
                <SelectGroupComponent :items="address" name="Destino" @setValue="(value) => filterForm.to = value"/>
              </div>

              <div class="col-12 col-md-3 col-lg-3">
                <InputFormComponent
                  label="Fecha de ida"
                  type="date"
                  placeholder="Seleccionar fecha de ida"
                  @input="(value) => filterForm.start_date = value"
                />
              </div>

              <div class="col-12 col-md-2 col-lg-2 px-2">
                <InputFormComponent
                  label="Fecha de regreso"
                  type="date"
                  placeholder="Seleccionar fecha de regreso"
                  @input="(value) => filterForm.end_date = value"
                />
              </div>
              <div class=" h-100 d-flex align-items-center">
                <ButtonComponent name="Buscar" className="btn-primary mt-4" @onClick="flightFilterByParms"/>
              </div>
          </div>
        </div>
      </div>

      <div class="w-100 d-flex justify-content-center" v-if="flights.length > 0">
        <div class="col-12 col-md-10 col-lg-10">
          <div class="card mb-2 cursor-pointer shadow p-3 bg-white rounded custom-card relative" v-for="item, key in flights" :key="key" @click="chooseFlight(key,item)">
            <div class="card-body">
              <div class="d-flex flex-wrap">
                <div class="col-12 col-md-4 col-lg-4">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <div class="w-100 text-start">
                        <span>{{item.time}}</span>
                      </div>
                      <div class="w-100 text-start">
                        <small class="text-uppercase">{{item.from.code}}</small>
                      </div>
                    </div>
                    <div> <span class=""> -------------------------- </span> </div>
                    <div>
                      <div class="w-100 text-end">
                        <span>{{item.arrival_time}}</span>
                      </div>              
                      <div class="w-100 text-end">
                        <small class="text-uppercase">{{item.to.code}}</small>
                      </div>              
                    </div>
                  </div>
                </div>

                <div class="col-12 col-md-4 col-lg-4">
                  <div>
                    <span class="h4 text-danger">{{item.duration}}</span>
                  </div>
                  <div><span class="badge badge-info bg-primary h4">{{item.type.name}}</span></div>
                </div>

                <div class="col-12 col-md-4 col-lg-4">
                  <div class="w-100 text-end">
                    <span class="h4 text-success fw-bold">$ {{item.price}}</span> <span> / 1</span>
                  </div>
                </div>
              </div>
              <div class="w-100 d-flex flex-wrap mt-5" v-if="selectedFlightIndex === key && seats.length > 0">
                <div class="pr-1" v-for="seat, index in seats" :key="index">
                  <span class="badge badge-info h4" :class="createForm.seats.filter((item) => item === seat.id).length > 0 ? 'bg-danger': 'bg-success'" @click="chooseSeat(index,seat, $event)">{{seat.name}}</span>
                </div>
              </div>

              <div class="w-100" v-if="createForm.seats.length == getPassengersQuantity() && selectedFlightIndex === key">
                <ButtonComponent name="Checkout" className="btn-primary text-white " @onClick="checkoutProccess(item)"/>
              </div>
            </div>
          </div>
        </div>      
        
      </div>
    </template>
  </LayoutGuest>  
</template>

<script>
import SelectGroupComponent from '@/components/common/SelectGroupComponent';
import InputFormComponent from '@/components/common/InputFormComponent';
import ButtonComponent from '@/components/common/ButtonComponent';
import CounterComponent from '@/components/common/CounterComponent';
import ErrorNotificationComponent from '@/components/common/ErrorNotificationComponent';
import LayoutGuest from '@/layouts/LayoutGuest.vue';


import AddressesService from '@/services/customer/addresses-service';
import UserTypeService from '@/services/customer/user-type-service';
import FlightService from '@/services/customer/flight-service';
import FlightSeatService from '@/services/customer/flight-seat-service';


export default {
  name: 'HomePage',
  components: {
    LayoutGuest,
    SelectGroupComponent,
    InputFormComponent,
    ButtonComponent,
    CounterComponent,
    ErrorNotificationComponent
  },

  data(){
    return{
        addressesService :new AddressesService(),
        userTypeService : new UserTypeService(),
        flightService: new FlightService(),
        flightSeatService: new FlightSeatService(),

        address:[],
        users:[],
        flights:[],
        errors:[],
        seats:[],

        filterForm:{
          from:0,
          to:0,
          start_date:'',
          end_date:'',
        },

        createForm:{
          passengers:[],
          seats:[],
        },

        selectedFlightIndex:null,


        showPassengers:false,
    }
  },

  mounted(){
    this.getAddress();
    this.getUserType();
  },

  methods:{
    getAddress(){
        this.addressesService.list((response) => {
          this.address = response.data;
        },(error) => {
          console.log(error)
        });
    },

    getUserType(){
        this.userTypeService.list((response) => {
          this.users = response.data;
        },(error) => {
          console.log(error)
        });
    }, 

    flightFilterByParms(){
        this.flights = [];
        this.flightService.list(this.filterForm,(response) => {
          this.flights = response.data;
        },(error) => {
          console.log(error)
        });
    },

    getFlightSeat(id){
      this.seats = [];
      this.flightSeatService.list({flight_type_id:id},(response) => {
        this.seats = response.data;
      },(error) => {
        console.log(error)
      });
    },

    setPassengers(passenger, value) {
      const exist = this.createForm.passengers.filter(({ id }) => id === passenger.value);
      if (exist.length === 0) {
        this.createForm.passengers.push({ id: passenger.value, value: value, name:passenger.text });
      } else {
        exist[0]["value"] = value;
      }
    },

    getPassengersQuantity(){
      const totalValue = this.createForm.passengers.reduce((total, passenger) => total + passenger.value, 0);
      return totalValue;
    },

    chooseFlight(index,item){
      this.errors = [];
      this.selectedFlightIndex = null;
      if(this.createForm.passengers.length == 0){
        this.errors.push("Seleccionar pasajeros");
        return;
      }
      this.selectedFlightIndex = index;
      this.getFlightSeat(item.type.id);
    },

    checkoutProccess(item){
      let data = {
        flight:item,
        form:this.createForm,
      };

      localStorage.setItem("flight",JSON.stringify(data));
      this.$router.push({ name: 'checkout'});
    },

    chooseSeat(index,item, event){
      event.stopPropagation();
      if(this.getPassengersQuantity() == this.createForm.seats.length){
        this.errors["Limite alcanzado"];
        return;
      }


      const existIndex = this.createForm.seats.indexOf(item.id); // Busca el índice del elemento en el array
      if (existIndex === -1) {
        this.createForm.seats.push(item.id);
      } else {
        this.createForm.seats.splice(index, 1);
      }
    }
  }
}
</script>
