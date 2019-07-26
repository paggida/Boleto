const lineCodeClass = require('../classes/lineCode')

_isSizeValidated=(lineCode)=> lineCode.length===47 || lineCode.length===48
_isOnlyNumbers=(lineCode)=> new RegExp(/^[0-9]{1,}$/).test(lineCode)
_getTypeLineCode=(lineCode)=> {
  switch (lineCode.length) {
    case 47:
      return "Título"
    case 48:
      return "Convênio"
  }
};
_getVd=(lineCode, beginOne=false)=>{
  const multiplicationEven = (beginOne)?1:2
  const multiplicationOdd = (beginOne)?2:1

  const sumNumbers= lineCode
    .map((item, index)=> (index%2===0)?Number(item)*multiplicationEven:Number(item)*multiplicationOdd)
    .reduce((sum, next)=> {
      if(next>9) console.log(`${sum}-[${Math.trunc(next/10)},${Math.round((next/10)%1*10)}]`)
      if(next>9) return sum + Math.trunc(next/10) + Math.round((next/10)%1*10)
      console.log(`${sum}-[${next}]`)
      return sum+next
    })
    console.log(`Total: ${sumNumbers}`)
    console.log(`${sumNumbers%10}`)
    console.log(`${10-sumNumbers%10}`)
 return Math.round((((Math.ceil(sumNumbers/10)*10)-sumNumbers%10)/10)%1*10)
}
_isVdValidated=({type, originalLineCode})=> {
  const arraylineCode = [...originalLineCode]
  switch (type) {
    case "Título":
      if(Number(arraylineCode[9])!==_getVd(arraylineCode.slice(0, 9))) return false
      if(Number(arraylineCode[20])!==_getVd(arraylineCode.slice(10, 20), true)) return false
      if(Number(arraylineCode[31])!==_getVd(arraylineCode.slice(21, 31), true)) return false
      return true
    case "Convênio":
      console.log(`${arraylineCode[11]} ( ${arraylineCode.slice(0, 11)})`)
      if(Number(arraylineCode[11])!==_getVd(arraylineCode.slice(1, 11))) return false
      //console.log('D01- OK')
      if(Number(arraylineCode[23])!==_getVd(arraylineCode.slice(12, 23), true)) return false
      //console.log('D02- OK')
      if(Number(arraylineCode[35])!==_getVd(arraylineCode.slice(24, 35))) return false
      //console.log('D03- OK')
      return true

      /*if(Number(arraylineCode[3])!==_getVd([...arraylineCode.slice(0, 3),...arraylineCode.slice(4, 31)])) return false
      return true*/
  }
};

module.exports = (req, res, next) => {
  const { lineCode } = req.params
  if(!_isSizeValidated(lineCode)){
    return res.status(411).json({ message: 'Código com tamanho inválido.' })
  }
  if(!_isOnlyNumbers(lineCode)){
    return res.status(412).json({ message: 'Código com caracteres inválidos.' })
  }

  const type = _getTypeLineCode(lineCode)
  const lineCodeObj = new lineCodeClass(type,lineCode)

  if(!_isVdValidated(lineCodeObj)){
    return res.status(400).json({ message: `${type} com dígito verificador inválido.` })
  }
  lineCodeObj.setValidatedTrue()

  req.lineCodeObj = lineCodeObj
  next()
};
