
module.exports = {
  getDetails(req, res) {
    const { lineCodeObj } = req

    return res.json({
      validated: lineCodeObj.validated,
      type: lineCodeObj.type,
      value:lineCodeObj.getValue(),
      dueDate:lineCodeObj.getDueDate(),
      codeBar:lineCodeObj.getCodeBar(),
    })
  }
};
