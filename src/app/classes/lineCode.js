const moment = require('moment')

class lineCode{
  constructor(type,lineCode,validated=false){
    this.validated= validated;
    this.type= type;
    this.bank= lineCode.substr(0,3);
    this.currency= lineCode.substr(3,1);
    this.baseDate= moment(process.env.BASE_DATE);
    this.dueDateIndex= lineCode.substr(33,4);
    this.value= lineCode.substr(37,10);
    this.ourNumber= `${lineCode.substr(4,5)}${lineCode.substr(10,6)}`;
    this.agency= lineCode.substr(16,4);
    this.account= lineCode.substr(21,8);
    this.wallet= lineCode.substr(29,2);
    this.firstVd= lineCode.substr(9,1);
    this.secondVd= lineCode.substr(20,1);
    this.thirdVd= lineCode.substr(31,1);
    this.originalLineCode= lineCode;
  };
  _getVerifyingDigitCodeBar(lineCode){
    const reverseLineCode = lineCode.reverse()
    let weight=1
    const sumNumbers= reverseLineCode
      .map((item)=> {
        weight=(weight===9)? 2: weight+1
        return Number(item)*weight
      })
      .reduce((sum, next)=> sum+next)
      const result = 11-sumNumbers%11
      return (result===0||result===11)? 1: result
  }
  setValidatedTrue(){
    this.validated=true;
  }
  getValue(){
    switch (this.type) {
      case "Título":
        return Number(this.value)/100?(Number(this.value)/100).toFixed(2):null
      case "Convênio":
      // Danilo -Adicionar o tratamento de valor
      break;
    }
    return null
  }
  getDueDate(){
    switch (this.type) {
      case "Título":
          return (Number(this.dueDateIndex))? moment(this.baseDate.add(Number(this.dueDateIndex), "days")).format('DD/MM/YYYY'):null;
      case "Convênio":
      // Danilo -Adicionar o tratamento de data
      break;
    }
    return null
  }
  getCodeBar(){
    switch (this.type) {
      case "Título":
          const vd = this._getVerifyingDigitCodeBar([...this.bank,...this.currency,...this.dueDateIndex,...this.value,...this.ourNumber,...this.agency,...this.account,...this.wallet])
          return `${this.bank}${this.currency}${vd}${this.dueDateIndex}${this.value}${this.ourNumber}${this.agency}${this.account}${this.wallet}`
      case "Convênio":
      // Danilo -Adicionar o tratamento de data
      break;
    }
  }
}
module.exports = lineCode;
