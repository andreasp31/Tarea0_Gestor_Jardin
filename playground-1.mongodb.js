/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'BDJardin';
const collection = 'plantas';

// Create a new database.
use(database);

// Create a new collection.
db.createCollection(collection);

db.plantas.insertMany([
  {
    "nombre": "Rosa",
    "familia": "Rosaceae",
    "luzNecesaria": "Alta",
    "riego": 9,
    "ubicacion": "exterior"
  },
  {
    "nombre": "Tulipan",
    "familia": "Liliaceae",
    "luzNecesaria": "Alta",
    "riego": 7,
    "ubicacion": "exterior"
  },
  {
    "nombre": "Petunia",
    "familia": "Petunieae",
    "luzNecesaria": "Alta",
    "riego": 5,
    "ubicacion": "maceta"
  }
])