const moment = require('moment')
module.exports = {
  getValue(type, lineCode) {
    switch (type) {
      case "Boleto":
        const value = Number(lineCode.slice(-10).reduce((sum, next)=> sum+next))/100
        return (value)?(value).toFixed(2):null
      case "Convênio":
      // Danilo -Adicionar o tratamento de valor
      break;
    }
    return null
  },
  getDueDate(type, lineCode) {
    const baseDate = moment(process.env.BASE_DATE);
    let days;

    switch (type) {
      case "Boleto":
          days = 3930
          return moment(baseDate.add(days, "days")).format('DD/MM/YYYY')
      case "Convênio":
      // Danilo -Adicionar o tratamento de data
      break;
    }

    return null
  },
  getCodeBar(type, lineCode) {
    switch (type) {
      case "Boleto":
        // Danilo -Arrancar os dígitos verificadores
      break;
      case "Convênio":
      // Danilo -Adicionar o tratamento de data
      break;
    }
    return ''
  }
};
