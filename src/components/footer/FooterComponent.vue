<template>
  <footer class="w-100 d-flex flex-wrap justify-content-center align-items-center">
    <div class="">
      <div class="w-100">
        <span class="h1 text-white">Dejanos tus datos</span>
      </div>
      <div class="w-100 d-flex flex-wrap pt-4">
        <div class="col-12 col-md-9">
          <input type="email" class="form-control" placeholder="ingresar email">
        </div>
        <div class="col-12 col-md-3 col-lg-3">
          <ButtonComponent name="Enviar" className="btn-success text-white border border-success"/> 
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  import ButtonComponent from '@/components/common/ButtonComponent';
  export default {
    name: 'NavBarComponent',
    components:{
      ButtonComponent
    },
  }
</script>
