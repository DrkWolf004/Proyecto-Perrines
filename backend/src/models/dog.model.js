import mongoose from "mongoose"; // Importa el módulo mongoose para interactuar con MongoDB

// Define el esquema para el modelo de perro
const DogSchema = new mongoose.Schema({
  name: {
    type: String, // Tipo de dato: String
    required: true, // Campo obligatorio
  },
  breed: {
    type: String, // Tipo de dato: String
    required: true, // Campo obligatorio
  },
  age: {
    type: Number, // Tipo de dato: Number
    required: true, // Campo obligatorio
  },
});

// Crea el modelo de perro basado en el esquema definido
const Dog = mongoose.model("Dog", DogSchema);

// Exporta el modelo para que pueda ser utilizado en otros módulos
export default Dog;
