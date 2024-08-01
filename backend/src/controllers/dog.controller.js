import Dog from "../models/dog.model.js"; // Importa el modelo de perro

// Controlador para crear un nuevo perro
export const createDog = async (req, res) => {
  try {
    const { name, breed, age } = req.body; // Extrae los campos 'name', 'breed' y 'age' del cuerpo de la solicitud
    const newDog = new Dog({ name, breed, age }); // Crea una nueva instancia del modelo 'Dog' con los datos proporcionados
    await newDog.save(); // Guarda el nuevo perro en la base de datos
    res.status(201).json({ message: "Perro creado", dog: newDog }); // Responde con un estado 201 (creado) y los datos del nuevo perro
  } catch (error) {
    res.status(500).json({ message: "Error al crear el perro", error }); // Maneja errores y responde con un estado 500 (error del servidor)
  }
};

// Controlador para obtener todos los perros
export const getDogs = async (req, res) => {
  try {
    const dogs = await Dog.find(); // Busca todos los documentos en la colección 'dogs'
    res.status(200).json(dogs); // Responde con un estado 200 (éxito) y los datos de todos los perros
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los perros", error }); // Maneja errores y responde con un estado 500 (error del servidor)
  }
};

//Controlador para eliminar un perro

export async function deleteDogs(req, res){
  try {
      const { id } = req.params;
      const dog = await Dog.findByIdAndDelete(id);
      if (!dog) {
          return res.status(404).json({
              message: "No se encontró el anuncio con el id " + id,
          });
      }
      res.status(200).json({
          message: "Perro eliminado",
          data: dog,
      });
  } catch (error) {
      console.log("Error en dog.controller.js -> deleteDogs()", error);
      res.status(500).json({ message: "Error interno del servidor" });
  }
}

// actualizar un perro por id

export async function updateDogs(req, res){
  try {
      const { id } = req.params;
      const updatedData = req.body;

      const Dogupdate = await Dog.findByIdAndUpdate(id, updatedData, { new: true });

      if (!Dogupdate) {
          return res.status(404).json({ message: 'id del perro no encontrada' });
      }
      res.status(200).json({
          message: "Perro actualizado",
          data: Dogupdate,
      });
  } catch (error) {
      console.log("Error en dog.controller.js -> updatedog()", error);
      res.status(500).json({ message: "Error interno del servidor" });
  }
}
