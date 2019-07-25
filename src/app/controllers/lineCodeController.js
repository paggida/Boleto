const lineCodeTools = require('../tools/lineCode')
module.exports = {
  getDetails(req, res) {
    const { type, lineCodeValidated } = req
    const { lineCode } = req.params
    const arrayLineCode = [...lineCode]

    return res.json({
      validated: lineCodeValidated,
      type,
      value:lineCodeTools.getValue(type,arrayLineCode),
      dueDate:lineCodeTools.getDueDate(type,arrayLineCode),
      codeBar: lineCodeTools.getCodeBar(type,arrayLineCode),
    })
  }
};
