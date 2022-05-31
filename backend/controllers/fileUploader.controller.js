const singleFileUpload = async (req, res, next) => {
  try {
    const file = req.file;
    req.status(201).send("File Uploaded Successfully!");
  } catch (error) {
    req.status(400).send(error.message);
  }
};

module.exports = { singleFileUpload };
