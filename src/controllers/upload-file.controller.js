// Los controladores son los encargados de procesar la informaciony manejar la lógica de negocio
// de la aplicación.
const { request, response } = require("express");
const { uploadFiles } = require("../helpers/uploader");

// La constante guarda el posteo del archivo.
const postFile = async (req = request, res = response) => {
  try {
   //guarda id recibido
   const id = req.params.id;

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      //* If hasn't a file:
      res.status(204).send("Files where not uploaded");
      return;
    }

    //* Get the file name and assemble to the object
    const img_id = await uploadFiles(req.files);
    // Crea el objeto
    const record = { img_id: img_id }; //* Create the object
  } catch (err) {
    console.error(err);
    res.status(404).json({ ok: false, err });
  }
};

module.exports = { postFile };