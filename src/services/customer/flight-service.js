import api from '@/network/http-common';
import Loader from '@/helpers/loader';
export default class FlightService {

  mode = 'customer';
  object = 'flight';
  objectUrl = this.mode +"/"+ this.object+"-";
  apiDefinition = {
    get:this.objectUrl+'get-by-parms',
    getById:this.objectUrl+'get-by-id',
    store:this.objectUrl+'store',
}


  list(parms,onSuccess, onError){
    let loader = new Loader();
    
    loader.show();
    try{
      api.send(this.apiDefinition.get, 'GET',parms).then((response) => {
        if(!response.success){ //!validation.notNull(response.message) ||
          onError(response);
          return;
        }
        onSuccess(response);
        loader.hide();
      }).catch((error) => {
        onError(error);
        loader.hide();
        throw error;
      });

    }catch(error){
      onError(error);
      loader.hide();
      throw error;
    }
  }

  getById(value,onSuccess, onError){
    let loader = new Loader();
    
    loader.show();
    try{
      api.send(this.apiDefinition.getById, 'GET',{ id:value }).then((response) => {
        if(!response.success){ //!validation.notNull(response.message) ||
          onError(response);
          return;
        }
        onSuccess(response);
        loader.hide();
      }).catch((error) => {
        onError(error);
        loader.hide();
        throw error;
      });

    }catch(error){
      onError(error);
      loader.hide();
      throw error;
    }
  }

  store(parms, onSuccess, onError){
    let loader = new Loader();
    
    loader.show();
    try{
      api.send(this.apiDefinition.store, 'POST', null, parms ).then((response) => {
        if(!response.success){ //!validation.notNull(response.message) ||
          onError(response);
          return;
        }
        onSuccess(response);
        loader.hide();
      }).catch((error) => {
        onError(error);
        loader.hide();
        throw error;
      });

    }catch(error){
      onError(error);
      loader.hide();
      throw error;
    }
  }
}