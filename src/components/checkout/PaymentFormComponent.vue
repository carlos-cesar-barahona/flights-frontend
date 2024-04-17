<template>
  <div>
    <form action="#" method="POST" id="payment-form">
      <input type="hidden" name="token_id" id="token_id">
      <input type="hidden" name="use_card_points" id="use_card_points" value="false">
      <div class="pymnt-itm">
        <div class="pymnt-cntnt">
          <div class="card-expl"></div>
          <div class="d-flex flex-wrap pb-2">
            <div class="col-12 col-md-6 col-lg-6 pr-2">
              <label>Nombre del titular</label>
              <input class="form-control" type="text" placeholder="Como aparece en la tarjeta" autocomplete="off" data-openpay-card="holder_name">
            </div>
            <div class="col-12 col-md-6 col-lg-6">
              <label>Número de tarjeta</label>
              <input class="form-control" type="text" autocomplete="off" data-openpay-card="card_number">
            </div>
          </div>
          <div class="d-flex flex-wrap pb-2">
            <div class="col-12 col-md-6 col-lg-6 pr-2">
              <div>
                <label>Fecha de expiración</label>
              </div>
              <div class="w-100 d-flex flex-wrap">
                <div class="col-12 col-md-6 col-lg-6 pr-1">
                  <select class="form-control" data-openpay-card="expiration_month">
                    <option value="1">Enero</option>
                    <option value="2">Febrero</option>
                    <option value="3">Marzo</option>
                    <option value="4">Abril</option>
                    <option value="5">Mayo</option>
                    <option value="6">Junio</option>
                    <option value="7">Julio</option>
                    <option value="8">Agosto</option>
                    <option value="9">Septiembre</option>
                    <option value="10">Octubre</option>
                    <option value="11">Noviembre</option>
                    <option value="12">Diciembre</option>
                  </select>
                </div>
                <div class="col-12 col-md-6 col-lg-6 ">
                  <input class="form-control" type="text" placeholder="Año" data-openpay-card="expiration_year">
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-6 pr-2">
              <label>Código de seguridad</label>
              <div class="sctn-col half l"><input class="form-control" type="text" placeholder="3 dígitos" autocomplete="off" data-openpay-card="cvv2"></div>
            </div>
          </div>
          <div class="d-flex pb-2">
            <div class="logo">Transacciones realizadas vía:</div>
            <div class="shield">Tus pagos se realizan de forma segura con encriptación de 256 bits</div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {

}
</script>