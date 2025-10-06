const prompt = require("prompt-sync")();

const mysql = require("mysql2/promise");

//Conexión con el cluster de mongodb
const { MongoClient } = require('mongodb');
//Ruta de conexión a atlas
const uri = 'mongodb+srv://andreasofiapais_db_user:yuZ7LQ0heP87sLYz@cluster0.dhnz1y7.mongodb.net/'; 
const cliente = new MongoClient(uri);
//Mi base de datos y la colección creada que tiene los datos en formato JSON
const database = 'BDJardin';
const collection = 'plantas';

//importar las clases
const importar_clases = require("./clases.js");
const { Planta } = importar_clases;
const gestionPlanta = new Planta();

//Función que aparece de primero como introducción al programa
function inicio(){
    console.clear();
    console.log("Pulsa ENTER para entrar al Jardín...");
    let entrar = prompt("\n");
    if (entrar == ""){
        menu();
    }
    else{
        console.log("No has introducido correctamente, vuelve a intentarlo. ");
        inicio();
    }
}

//Menú principal donde aparece con que base de tados se quiere tratar
async function menu(){
    console.clear();
    console.log("Tipo de fichero con el que trabajar, selecciona uno: ");
    console.log("1. Archivo JSON.");
    console.log("2. Archivo TXT.");
    console.log("3. Base de Datos MySQL");
    console.log("4. Base de Datos MongoDB \n");
    console.log("5. Salir del gestor. \n");
    seleccionarMenu();
}

//Selección a que base de datos queremos empezar a trabajar
async function seleccionarMenu(){
    let seleccionar = prompt("");
    switch(parseInt(seleccionar)){
        case 1:{
            console.clear();
            menuPlanta();
            seleccionarMenuPlanta1();
            break;
        }
        case 2:{
            console.clear();
            menuPlanta();
            seleccionarMenuPlanta2();
            break;
        }
        case 3:{
            console.clear();
            menuPlanta();
            seleccionarMenuPlanta3();
            break;
        }
        case 4:{
            console.clear();
            menuPlanta();
            seleccionarMenuPlanta4();
            break;
        }
        case 5:{
            console.clear();
            console.log("Has salido del Jardín.");
            break;
        }
        default:{
            console.clear();
            console.log("No has seleccinado correctamente, vuelve a intentarlo. ");
            seleccionarMenu();
        }
    }
}

//Función de conexión con la Base de Datos MySQL con Workbench
async function conectarBase(){
    console.log("Conectando con la Bases de Datos...\n ");
    try{
        const connection = mysql.createConnection({
            host: "localhost",
            user: "andrea",
            password: "123456789",
            database: "Prueba"
        });

        console.log("Conexión establecida con la Base de Datos.");  
        console.clear(); 
        return connection;   
    }
        
    catch(error){
        console.log("Error con la Base de Datos:", error);
    }
}

//Menú con las funcionalidades para trabajar con las plantas
async function menuPlanta(){
    console.log("--- GESTIÓN DEL JARDÍN DE VERÍN ---\n");
    console.log("1. Añadir una nueva planta. ");
    console.log("2. Modificar una planta. ");
    console.log("3. Mostrar plantas. ");
    console.log("4. Borrar una planta.\n ");
    console.log("5. Salir\n");
}

//Menú de selección para trabajar con JSON
async function seleccionarMenuPlanta1(){
    let seleccionar = prompt("Selecciona una de las opciones: ");
    switch(parseInt(seleccionar)){
        case 1:{
            console.clear();
            gestionPlanta.crearPlantaJson();
            otra_accion();
            break;
        }
        case 2:{
            console.clear();
            gestionPlanta.modificarPlantaJson();
            otra_accion();
            break;
        }
        case 3:{
            console.clear();
            listarPlantas();
            seleccionarListaPlanta();
            otra_accion()
            break;
        }
        case 4:{
            console.clear();
            gestionPlanta.borrarPlantaJson();
            otra_accion();
            break;
        }
        case 5:{
            console.clear();
            menu();
            break;
        }
        default:{
            console.log("No has seleccionado correctamente una de las opciones, vuelve a intentarlo. ");
            seleccionarMenuPlanta1();
            break;
        }

    }
}

//Menú de selección para trabajar con TXT
async function seleccionarMenuPlanta2(){
    let seleccionar = prompt("Selecciona una de las opciones: ");
    switch(parseInt(seleccionar)){
        case 1:{
            console.clear();
            gestionPlanta.crearPlantaTxt();
            otra_accion();
            break;
        }
        case 2:{
            console.clear();
            gestionPlanta.modificarPlantaTxt();
            break;
        }
        case 3:{
            console.clear();
            listarPlantas();
            seleccionarListaPlantaTxt();
            break;
        }
        case 4:{
            console.clear();
            gestionPlanta.borrarPlantaTxt();
            otra_accion();
            break;
        }
        case 5:{
            console.clear();
            menuPlanta();
            break;
        }
        default:{
            console.log("No has seleccionado correctamente una de las opciones, vuelve a intentarlo. ");
            seleccionarMenuPlanta1();
            break;
        }
    }
}

//Menú de selección para trabajar con MySQL
async function seleccionarMenuPlanta3(){
    let seleccionar = prompt("Selecciona una de las opciones: ");
    switch(parseInt(seleccionar)){
        case 1:{
            console.clear();
            nuevaPlantaMyql();
            break;
        }
        case 2:{
            console.clear();
            modificarPlantaMyql();
            break;
        }
        case 3:{
            console.clear();
            listarPlantas();
            seleccionarListaPlanta3();
            break;
        }
        case 4:{
            console.clear();
            borrarPlantaMyql();
            break;
        }
        case 5:{
            console.clear();
            menu();
            break;
        }
        default:{
            console.log("No has seleccionado correctamente una de las opciones, vuelve a intentarlo. ");
            seleccionarMenuPlanta1();
            break;
        }

    }
}

//Menú de selección para trabajar con Mongodb
async function seleccionarMenuPlanta4(){
    let seleccionar = prompt("Selecciona una de las opciones: ");
    switch(parseInt(seleccionar)){
        case 1:{
            console.clear();
            nuevaPlantaMongo();
            break;
        }
        case 2:{
            console.clear();
            modificarPlantaMongo();
            break;
        }
        case 3:{
            console.clear();
            listarPlantas();
            seleccionarListaPlanta4();
            break;
        }
        case 4:{
            console.clear();
            borrarPlantaMongo();
            break;
        }
        case 5:{
            console.clear();
            menu();
            break;
        }
        default:{
            console.log("No has seleccionado correctamente una de las opciones, vuelve a intentarlo. ");
            seleccionarMenuPlanta1();
            break;
        }

    }
}

//Función de listado total de plantas con Mongodb
async function listarPlantasMongo(){
    try{
        //Llamar a la colección creada en la base de datos de mongobd
        await cliente.connect();
        const db = cliente.db(database);
        const planta = db.collection(collection);
        //Se busca todo lo que se encuentra en el array de la base de datos
        const resultado = await planta.find().toArray();
        console.log("Plantas:", resultado);
    } 
    catch (error){
        console.error("Ha ocurrido un error,", error);
    }
    //Cerrar la llamada a la conexión 
    await cliente.close();
}

//Función de listado filtrado por familia de plantas con Mongodb
async function filtrarPlantas1Mongo(){
    try{
        //Llamar a la colección creada en la base de datos de mongobd
        await cliente.connect();
        const db = cliente.db(database);
        const planta = db.collection(collection);
        //Se busca todo lo que se encuentra en el array de la base de datos filtrando por la familia
        let filtro = prompt("Introduce el nombre de la familia a filtrar: ");
        let resultado = await planta.find({familia: filtro.toLowerCase()}).toArray();
        console.log("Plantas filtradas: ", resultado);
    }
    catch (error){
        console.error("Ha ocurrido un error,", error);
    }
    //Cerrar la llamada a la conexión 
    await cliente.close();
    otra_accion();
}

//Función de listado filtrado por cantidad de luz necesaria de plantas con Mongodb
async function filtrarPlantas2Mongo(){
    try{
        //Llamar a la colección creada en la base de datos de mongobd
        await cliente.connect();
        const db = cliente.db(database);
        const planta = db.collection(collection);
        //Se busca todo lo que se encuentra en el array de la base de datos filtrando por la luz necesaria
        let filtro = prompt("Introduce el nombre de la cantidad de luz a filtrar (Alta - Media - Baja): ");
        let resultado = await planta.fing({luzNecesaria: filtro.toLowerCase()}).toArray();
        console.log("Plantas filtradas: ", resultado);
    }
    catch (error){
        console.error("Ha ocurrido un error,", error);
    }
    //Cerrar la llamada a la conexión
    await cliente.close();
    otra_accion();
}

//Función de creación de plantas con Mongodb
async function nuevaPlantaMongo(){
    try{
        //Llamar a la colección creada en la base de datos de mongobd
        await cliente.connect();
        const db = cliente.db(database);
        const planta = db.collection(collection);
        //Propiedades de la nueva planta
        let nombre = prompt("Nombre de la planta: ");
        let familia = prompt("Introduce la familia: ");
        let luzNecesaria = prompt("Luz necesaria (Alta / Media / Baja): ");
        let riego = parseInt(prompt("Cada cuánto se riega (días): "));
        let ubicacion = prompt("Ubicación (Interior / Exterior / Maceta): ");

        //Añadir la planta insertando en la base de datos
        const nuevaPlanta = {nombre,familia,luzNecesaria,riego,ubicacion};
        const resultado = await planta.insertOne(nuevaPlanta);

    }
    catch (error){
        console.log("Ha ocurrido un error,", error);
    }
    //Cerrar la llamada a la conexión
    await cliente.close();
    otra_accion();
}

//Función de modificación de plantas con Mongodb
async function modificarPlantaMongo(){
    try{
        //Llamar a la colección creada en la base de datos de mongobd
        await cliente.connect();
        const db = cliente.db(database);
        const planta = db.collection(collection);
        //Propiedades de la planta a modificar / campo a modificar y nuevo valor
        let nombre = prompt("Introduce el nombre de la planta a modificar: ");
        let campo = prompt("¿Qué quieres modificar? (nombre / familia / luz / riego / ubicacion): ");
        let nuevoValor = prompt("Nuevo valor: ");

        if(campo.toLowerCase() === "riego"){
            nuevoValor = parseInt(nuevoValor);
        }

        let resultado = await planta.updateOne(
            {nombre},
            { $set: {[campo.toLowerCase()]: nuevoValor} } // actualización de forma dinámica
        )
    }
    //Cerrar la llamada a la conexión
    catch (error){
        console.log("Ha ocurrido un error,", error);
    }
    await cliente.close();
    otra_accion();
}

//Función de borrado de plantas con Mongodb
async function borrarPlantaMongo(){
    try{
        //Llamar a la colección creada en la base de datos de mongobd
        await cliente.connect();
        const db = cliente.db(database);
        const planta = db.collection(collection);
        //Nombre de la planta y en el filtrado se borra la planta seleccionado
        let nombre = prompt("Introduce el nombre de la planta a borrar: ");  
        let nombreBorrar = nombre.toLowerCase()
        const resultado =  await planta.deleteOne({nombreBorrar});
    }
    catch (error){
        console.log("Ha ocurrido un error,", error);
    }
    //Cerrar la llamada a la conexión
    await cliente.close();
    otra_accion();
}

//Función de selección para el menú de listado para MySQL
async function seleccionarListaPlanta3(){
    let seleccionar = prompt("Seleccionar una de las opciones: ");
    switch(parseInt(seleccionar)){
        case 1:{
            console.clear();
            await listartodasMyql();
            otra_accion();
            break;
        }
        case 2:{
            console.clear();
            listarFamiliaMyql();
            break;
        }
        case 3:{
            console.clear();
            listarLuzMyql();
            break;    
        }
        case 4:{
            console.clear();
            inicio();
            break;
        }
        default:{
            console.log("No has seleccionado correctamente una de las opciones, vuelve a intentarlo. ");
            seleccionarListaPlanta();
            break;
        }
    }
}

//Función de selección para el menú de listado para MongoDB
async function seleccionarListaPlanta4(){
    let seleccionar = prompt("Seleccionar una de las opciones: ");
    switch(parseInt(seleccionar)){
        case 1:{
            console.clear();
            listarPlantasMongo();
            otra_accion();
            break;
        }
        case 2:{
            console.clear();
            filtrarPlantas1Mongo();
            break;
        }
        case 3:{
            console.clear();
            filtrarPlantas2Mongo();
            break;    
        }
        case 4:{
            console.clear();
            inicio();
            break;
        }
        default:{
            console.log("No has seleccionado correctamente una de las opciones, vuelve a intentarlo. ");
            seleccionarListaPlanta();
            break;
        }
    }
}

//Función de creación de plantas con MySQL
async function nuevaPlantaMyql(){
    //Llamamos a la función para conectar con la base de datos
    let connection = await conectarBase();
    //Contamos cuantas plantas hay en el archivo MySQL para añadir un identificador nuevo a la nueva planta
    let [rows] = await connection.execute(`SELECT * FROM Jardin`);
    let contadorPlantas = 0;
    rows.forEach(row => {
        contadorPlantas++;
    });
    //Propiedades de la planta
    let nombre = prompt("Nombre de la planta: ");
    let familia = prompt("Introduce la familia: ");
    let luzNecesaria = prompt("Luz necesaria: (Alta - Media - Baja): ");
    let riego = prompt("Cada cuanto se riega (días): ");
    let ubicacion = prompt("Donde se ubica la planta (Interior - Exterior - Maceta): "); 
    //Consulta para añadir la nueva planta
    await connection.execute(`INSERT INTO Jardin VALUES (${contadorPlantas+1},"${nombre}","${familia}","${luzNecesaria}",${riego},"${ubicacion}");`);
    console.log("\n");
    console.log("Planta añadida correctamente.");
    //Cerramos la conexión con la base de datos
    connection.end();
    console.log("\n");
    console.log("Conexión terminada.");
    otra_accion();
}

//Función de modificación de plantas con MySQL
async function modificarPlantaMyql(){
    //Enseñamos que plantas hay en el arcivo MySQL
    await listartodasMyql();
    let modificar = prompt("Introduce el nombre de la planta a modificar: ");
    //Conexión a la Base de Datos de WOrkbench
    let connection = await conectarBase();
    //Consulta para seleccionar la planta a modificar
    await connection.execute(`SELECT Nombre FROM Jardin WHERE Nombre LIKE "${modificar}"`); 
    let campo = prompt("¿Que quiere editar? (Nombre / Familia / LuzNecesaria / Riego / Ubicacion) - IMPORTANTE USAR LA PRIMERA MAYÚSCULA: ");
    console.log("\n");
    //Nuevo valor y el campo que se modifica
    let nuevo_valor = prompt("Nuevo valor: ");
    //Modificamos como int la propiedad de riego y su consulta y el resto de propiedades se actualizan como string
    if (campo == "Riego") {
        await connection.execute(`UPDATE Jardin SET ${campo} = ${nuevo_valor} WHERE Nombre = "${modificar}"`);
    }
    else {
        await connection.execute(`UPDATE Jardin SET ${campo} = "${nuevo_valor}" WHERE Nombre = "${modificar}"`);
    }
    console.log("\n");
    console.log("Se ha modificado correctamente la planta.");
    //Se cierra conexión con base de Datos
    connection.end();
    console.log("\n");
    console.log("Conexión terminada.");
    otra_accion();
}

//Función de borrado de plantas con MySQL
async function borrarPlantaMyql(){
    await listartodasMyql();
    let modificar = prompt("Introduce el nombre de la planta a borrar (UTILIZAR LA PRIMERA LETRA MAYÚSCULA): ");
    let connection = await conectarBase();
    console.log("\n");
    await connection.execute(`DELETE FROM Jardin WHERE Nombre LIKE "${modificar}"`);
    console.log("\n");
    console.log("Se ha borrado correctamente la planta.");
    connection.end();
    console.log("\n");
    console.log("Conexión terminada.");
    otra_accion();
}

//Función de listado de plantas con MySQL
async function listartodasMyql(){
    let connection = await conectarBase();
    const [rows, fields] = await connection.execute("SELECT * FROM Jardin");
    console.log(rows);
    connection.end();
    console.log("\n");
    console.log("Conexión terminada.");
}

//Función de listado de plantas filtrado por familias de plantas con MySQL
async function listarFamiliaMyql(){
    let connection = await conectarBase();
    let filtrar = prompt("Introduce el nombre de la familia a filtrar (UTILIZA LA PRIMERA LETRA MAYÚSCULA): ");
    const [rows, fields] = await connection.execute(`SELECT * FROM Jardin WHERE Familia LIKE "${filtrar}"`);
    console.log(rows);
    connection.end(); 
    console.log("\n");
    console.log("Conexión terminada.");
    otra_accion();
}

//Función de listado de plantas filtrado por cantidad de luz necesaria de plantas con MySQL
async function listarLuzMyql(){
    let connection = await conectarBase();
    let filtrar = prompt("Introduce el rango de luz necesaria a filtrar (UTILIZA LA PRIMERA LETRA MAYÚSCULA): ");
    const [rows, fields] = await connection.execute(`SELECT * FROM Jardin WHERE LuzNecesaria LIKE "${filtrar}"`);
    console.log(rows);
    connection.end(); 
    console.log("\n");
    console.log("Conexión terminada.");
    otra_accion();
}

//Menú de opciones por las que se pueden filtrar las plantas
async function listarPlantas(){
    console.log("--  Listar por: --");
    console.log("1. Listar todas las plantas.");
    console.log("2. Listar por familias.");
    console.log("3. Listar por luz necesaria.\n");
    console.log("4. Salir\n");
}

//Menú de selección de listado de plantas para JSON
async function seleccionarListaPlanta(){
    let seleccionar = prompt("Seleccionar una de las opciones: ");
    switch(parseInt(seleccionar)){
        case 1:{
            console.clear();
            gestionPlanta.listarPlantaJson();
            break;
        }
        case 2:{
            console.clear();
            gestionPlanta.listarFamiliaJson();
            break;
        }
        case 3:{
            console.clear();
            gestionPlanta.listarLuzJson();
            break;    
        }
        case 4:{
            console.clear();
            inicio();
            break;
        }
        default:{
            console.log("No has seleccionado correctamente una de las opciones, vuelve a intentarlo. ");
            seleccionarListaPlanta();
            break;
        }
    }
}

//Menú de selección de listado de plantas para TXT
async function seleccionarListaPlantaTxt(){
    let seleccionar = prompt("Seleccionar una de las opciones: ");
    switch(parseInt(seleccionar)){
        case 1:{
            console.clear();
            gestionPlanta.listarPlantaTxt();
            otra_accion();
            break;
        }
        case 2:{
            console.clear();
            gestionPlanta.listarFamiliaTxt();
            break;
        }
        case 3:{
            console.clear();
            gestionPlanta.listarLuzTxt();
            break;    
        }
        case 4:{
            console.clear();
            inicio();
            break;
        }
        default:{
            console.log("No has seleccionado correctamente una de las opciones, vuelve a intentarlo. ");
            seleccionarListaPlanta();
            break;
        }
    }
}

//Función que pide cada vez que acabe una funcionalidad si quieres continuar realizando acciones o quieres salir del programa
async function otra_accion(){
    console.log("\n");
    console.log("----------------------------------------");
    console.log("Quieres realizar otra acción?: Si o No");
    let mas = prompt("");
    if(mas.toLowerCase() == "si"){
        console.clear();
        menu();
    }
    else if(mas.toLowerCase() == "no"){
            console.clear();
            console.log("-- Has salido del gestor del Jardín --");
    }
    else{
        otra_accion();
    }
}  

module.exports = {inicio,menu,seleccionarMenu,menuPlanta,seleccionarMenuPlanta1,seleccionarMenuPlanta2}