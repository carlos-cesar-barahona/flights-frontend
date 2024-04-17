export default class Validations{
	constructor(){}

	isNull(value){
		try{
			return typeof(value) === 'undefined' || value === '' || value === "null" || value === null;
		}catch(e){
			return true;
		}
	}

	parseValue(value){
		if(this.isNull(value)){
			return '';
		}
		return value;
	}
}