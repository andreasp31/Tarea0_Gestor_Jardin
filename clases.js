const prompt = require("prompt-sync")();
const fs = require("fs");
//Ruta del archivo json y ruta del archivo txt
const ruta = "./lista.json";
const ruta2 = "lista.txt";

//Leer
const leer = fs.readFileSync(ruta,"utf8");
const parsear = JSON.parse(leer);

//Clase única con los métodos para trabajar con JSON y TX 
class Planta{
    //Propiedades de cada planta
    constructor(nombre,familia,luzNecesaria,riego,ubicacion){
        this.nombre = nombre;
        this.familia = familia;
        this.luzNecesaria = luzNecesaria;
        this.riego = riego;  
        this.ubicacion = ubicacion;
    }

    //Método para crear una planta en JSON
    crearPlantaJson(){
        console.log("-- Añadir una planta al Jardín --\n");
        //Nuevas propiedades
        let nombre = prompt("Nombre de la planta: ");
        let familia = prompt("Introduce la familia: ");
        let luzNecesaria = prompt("Luz necesaria: (Alta - Media - Baja): ");
        let riego = parseInt(prompt("Cada cuanto se riega (días): "));
        let ubicacion = prompt("Donde se ubica la planta (Interior - Exterior - Maceta): ");

        //Nueva planta
        let nueva_planta = new Planta(nombre,familia,luzNecesaria,riego,ubicacion);
        //Añadir
        parsear.push(nueva_planta);
        //Guardar
        const datos = JSON.stringify(parsear,null,2);
        fs.writeFileSync(ruta,datos,"utf8");
        console.log("\n");
        console.log("Se ha añadido correctamente una planta al Jardín.");
    }

    //Método para modificar una planta en JSON escribiendo el nombre
    modificarPlantaJson(){
        this.listarPlantaJson();
        console.log("\n");
        let nombre = prompt("Introduce el nombre de la planta que se quiera modificar: ");
        console.log("\n");
        let planta_encontrada = false;
        for (let i=0; i< parsear.length; i++){
            if(nombre.toLowerCase() == parsear[i].nombre.toLowerCase()){
                let campo = prompt("¿Que quiere editar? (nombre / familia / luz / riego / ubicación):");
                console.log("\n");
                let nuevo_valor = prompt("Nuevo valor: ");
                //Sustituir el nuevo valor en el sitio el anterior y guardar el JSON
                parsear[i][campo] = nuevo_valor;
                const datos = JSON.stringify(parsear,null,2);
                fs.writeFileSync(ruta,datos,"utf8");
                console.log("\n");
                console.log("Se ha modificado correctamente una planta al Jardín.");
                planta_encontrada = true;
                break;
            }
        }
        if(!planta_encontrada){
            console.log("\n");
            console.log("No se ha seleccionado correctamente una planta, vuelve a intentarlo.");
            this.modificarPlantaJson();
        }
    }

    //Método para enseñar todas las plantas del JSON con un for
    listarPlantaJson(){
        console.log("-- Lista de todas las plantas del Jardín -- \n");
        for(let i=0; i<parsear.length; i++){
            console.log("-- Planta : ",i);
            console.log("Nombre: ", parsear[i].nombre);
            console.log("Familia: ", parsear[i].familia);
            console.log("Luz Necesaria: ", parsear[i].luzNecesaria);
            console.log("Riego cada ", parsear[i].riego," días");
            console.log("Ubicación: ", parsear[i].ubicacion);
            console.log("-----------------------------");
        }
    }

    //Método para enseñar todas las plantas del JSON con un for pero con un filtrado mediante una familia
    listarFamiliaJson(){
        this.listarPlantaJson();
        console.log("\n");
        let filtrar = prompt("Introduce el nombre de la familia a filtrar: ");
        console.log("\n");
        for(let i=0; i<parsear.length; i++){
            if(filtrar.toLowerCase() == parsear[i].familia.toLowerCase()){
                console.log("-- Planta : ",i);
                console.log("Nombre: ", parsear[i].nombre);
                console.log("Familia: ", parsear[i].familia);
                console.log("Luz Necesaria: ", parsear[i].luzNecesaria);
                console.log("Riego cada ", parsear[i].riego," días");
                console.log("Ubicación: ", parsear[i].ubicacion);
                console.log("-----------------------------");
            }
        }
    }

    //Método para enseñar todas las plantas del JSON con un for pero con un filtrado mediante la cantidad de luz que necesita
    listarLuzJson(){
        this.listarPlantaJson();
        console.log("\n");
        let filtrar = prompt("Introduce el rango de luz necesaria a filtrar: ");
        console.log("\n");
        for(let i=0; i<parsear.length; i++){
            if(filtrar.toLowerCase() == parsear[i].luzNecesaria.toLowerCase()){
                console.log("-- Planta : ",i);
                console.log("Nombre: ", parsear[i].nombre);
                console.log("Familia: ", parsear[i].familia);
                console.log("Luz Necesaria: ", parsear[i].luzNecesaria);
                console.log("Riego cada ", parsear[i].riego," días");
                console.log("Ubicación: ", parsear[i].ubicacion);
                console.log("-----------------------------");
            }
        }
    }

    //Método para borrar una planta del JSON a través del nombre y usando splice para recolocar el id de cada planta al listar otra vez
    borrarPlantaJson(){
        this.listarPlantaJson();
        console.log("\n");
        let borrar = prompt("Escribe el nombre de la planta que desea borrar: ");
        for(let i=0; i<parsear.length; i++){
            if(borrar.toLowerCase() == parsear[i].nombre.toLowerCase()){
                parsear.splice(i,1);
                const datos = JSON.stringify(parsear,null,2);
                fs.writeFileSync(ruta,datos,"utf8");
                console.log("\n");
                console.log("Se ha borrado correctamente una planta del Jardín.");
                break;
            }
        }
    }

    //Método para crear una planta en TXT 
    crearPlantaTxt(){
        console.log("-- Añadir una planta al Jardín --\n");
        //Propiedades de la plantas
        let nombre = prompt("Nombre de la planta: ");
        let familia = prompt("Introduce la familia: ");
        let luzNecesaria = prompt("Luz necesaria: (Alta - Media - Baja): ");
        let riego = parseInt(prompt("Cada cuanto se riega (días): "));
        let ubicacion = prompt("Donde se ubica la planta (Interior - Exterior - Maceta): ");

        let planta_texto ="\n" + nombre + "," + familia + "," + luzNecesaria + "," + riego + "," + ubicacion;

        fs.appendFileSync(ruta2,planta_texto,"utf8");

        console.log("\n");
        console.log("Se ha añadido correctamente una planta al Jardín.")
    }

    //Método para modificar una planta en TXT
    modificarPlantaTxt(){
        console.log("-- Modificación de plantas del Jardín -- \n");
        //Leemos el archivo TXT
        const data = fs.readFileSync(ruta2,"utf8");
        let lineas = data.split("\n");
        let buscar = prompt("Nombre de la planta a modificar: ");
        let planta_encontrada = false;
        for(let i=0; i<lineas.length; i++){
            let campos = lineas[i].split(",");
            //Buscamos el campo a modificar
            if(campos[0].toLowerCase() == buscar.toLowerCase()){
                planta_encontrada = true;
                let campo = prompt("¿Qué quieres modificar? (nombre / familia / luz / riego / ubicacion): ");
                let nuevo_valor = prompt("Nuevo valor: ");
                //Y sustituimos cada campo en la posición correcta de las propiedades
                if(campo.toLowerCase() == "nombre") {
                    campos[0] = nuevo_valor;
                }
                else if(campo.toLowerCase() == "familia"){
                    campos[1] = nuevo_valor;
                }
                else if(campo.toLowerCase() == "luz"){
                    campos[2] = nuevo_valor;
                }
                else if(campo.toLowerCase() == "riego"){
                    campos[3] = nuevo_valor;
                }
                else if(campo.toLowerCase() == "ubicacion"){
                    campos[4] = nuevo_valor;
                }
                else{
                    console.log("Campo no válido.");
                    return
                }
                lineas[i] = campos.join(",");
                break;
            }
        }
        if(!planta_encontrada){
            console.log("no se ha encontrado la planta.");
        }
        else{
            //Se guarda el TXT
            fs.writeFileSync(ruta2,lineas.join("\n"),"utf8");
            console.log("Se ha modificado correctamente la planta.");
        }
    }

    //Función de listado de las plantas del TXT
    listarPlantaTxt(){
        console.log("-- Lista de todas las plantas del Jardín -- \n");
        const data = fs.readFileSync(ruta2,"utf8");
        let lineas = data.split("\n");
        //Enseña las plantas que hay
        for(let i=0; i<lineas.length; i++){
            if(lineas[i] !== ""){
                console.log(lineas[i]);
            }
        }
    }

    //Función de listado de las plantas del TXT mediante el nombre de la familia como sabemos la posición que ocupa la propiedad familia en la línea es solo enseñar esa línea
    listarFamiliaTxt(){
        this.listarPlantaTxt();
        console.log("\n");
        const data = fs.readFileSync(ruta2, "utf8");
        let lineas = data.split("\n");
        let filtrar = prompt("Introduce el nombre de la familia a filtrar: ");
        let encontrar = false;
        console.clear();
        console.log("-- Resultado del filtro --");
        for(let i=0; i < lineas.length; i++){
            let linea = lineas[i];
            if (linea !== ""){
                let campos = linea.split(",");
                let familia = campos[1];
                if(familia.toLowerCase() === filtrar.toLowerCase()){
                    console.log(linea);
                    encontrar = true;
                }
            }
        }
        if(!encontrar){
            console.log("No se encontraron plantas de esa familia.");
        }  
    }

    //Función de listado de las plantas del TXT mediante el nombre de la cantidad de luz necesaraia como sabemos la posición que ocupa la propiedad en la línea es solo enseñar esa línea
    listarLuzTxt(){
        this.listarPlantaTxt();
        console.log("\n");
        const data = fs.readFileSync(ruta2, "utf8");
        let lineas = data.split("\n");
        let filtrar = prompt("Introduce el rango de luz necesaria a filtrar: ");
        let encontrar = false;
        console.clear();
        console.log("-- Resultado del filtro --");
        for(let i=0; i < lineas.length; i++){
            let linea = lineas[i];
            if (linea !== ""){
                let campos = linea.split(",");
                let luz = campos[2];
                if(luz.toLowerCase() === filtrar.toLowerCase()){
                    console.log(linea);
                    encontrar = true;
                }
            }
        }
        if(!encontrar){
            console.log("No se encontraron plantas con ese rango de luz necesaria.");
        }
        
    }

    //Función de borrado de la planta mediante el nombre y al saber ya que la posición del nombre en cada línea
    borrarPlantaTxt(){
        let data = fs.readFileSync(ruta2, "utf8");
        let lineas = data.split("\n");
        let nombre_buscado = prompt("Nombre de la planta a eliminar: ");
        let nlista = [];

        for(let i=0; i<lineas.length; i++){
            let campos = lineas[i].split(",");
            if(campos[0].toLowerCase() !== nombre_buscado.toLowerCase() && lineas[i] !== ""){
                nlista.push(lineas[i]);
            }
        }
        fs.writeFileSync(ruta2,nlista.join("\n"),"utf8");
        console.log("Planta eliminada correctamente.");
    }
}

module.exports = {Planta};