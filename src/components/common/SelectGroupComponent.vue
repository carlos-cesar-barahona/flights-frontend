<template>
  <div>
    <div class="text-start" v-if="name != ''">
      <label style="font-weight: 600;">{{name}}</label>
    </div>
    <select ref="mySelect" class="js-example-basic-single form-control" v-model="selectedValue" v-if="!multiple">
      <option value="0">Seleccionar una opción</option>
      <option v-for="item, index in items" :key="index" :value="item.value" >{{item.text}}</option>
    </select>

    <select ref="mySelect" class="js-example-basic-single form-control" v-model="selectedValue" v-else  multiple="multiple">
      <option value="0">Seleccionar una opción</option>
      <option v-for="item, index in items" :key="index" :value="item.value" >{{item.text}}</option>
    </select>
  </div>
</template>

<script>
import 'select2/dist/css/select2.min.css';
import $ from 'jquery';
import 'select2';

export default {
  props:{
    items:{
      type:Array
    },
    name:{
      type:String,
      default:''
    },
    defaultValue:{
      type:Number,
      default:0
    },
    multiple:{
      type:Boolean,
      default:false
    }

  },
  data() {
    return {
      selectedValue: this.multiple ? [] : this.defaultValue,
    };
  },
  mounted() {
    const $select = $(this.$refs.mySelect);
    setTimeout(() => {
      this.selectedValue = this.multiple ?  [this.multiple] : this.defaultValue;
      $($select).val(this.multiple ? [this.selectedValue] : this.selectedValue).trigger("change");
    },75);

    // Inicializa Select2
    $select.select2();

    // Agrega un escuchador de eventos para el cambio de valor
    $select.on('change', this.handleSelectChange);
  },

  methods: {
    handleSelectChange(event) {
      this.$emit("setValue",eval($(event.target).val()));
    },
  },
};
</script>

<style>
  .select2.select2-container.select2-container--default{
    width:100%!important;
    .select2-selection__rendered{
      text-align:left!important;
    }
  }

  .select2-selection.select2-selection--single{
    height: 37px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>