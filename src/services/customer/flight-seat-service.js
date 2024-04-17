import api from '@/network/http-common';
import Loader from '@/helpers/loader';
export default class FlightSeatService {

  mode = 'customer';
  object = 'flight-seat';
  objectUrl = this.mode +"/"+ this.object+"-";
  apiDefinition = {
    get:this.objectUrl+'get',
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
}