const singleFileUpload = async (req, res, next) => {
  try {
    const file = req.file;
    return res.status(201).send("File Uploaded Successfully!");
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = { singleFileUpload };
