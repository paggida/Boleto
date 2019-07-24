module.exports = {
  async getDetails(req, res) {
    const { barcode } = req.params
    return res.json({ barcode });
  }
};
