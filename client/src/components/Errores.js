export function validation(input){
    let errors ={};

    if (!input.name) errors.name = "You must enter a breed or name"; // debe introducir el nombre 
    if (!input.height_min) errors.height_min = "You must enter a minimum height";
    if (!input.height_max) errors.height_max = "You must enter a maximum height";
    if (!input.weight_min) errors.weight_min = "You must enter a minimum weight";
    if (!input.weight_max) errors.weight_max = "You must enter a maximum weight";
    if (!input.life_span) errors.life_span = "You must enter a life span";
    
    
    
    if(!input.name){
        errors.name ="enter the name please";
    }else if(input.name.search(/^[a-zA-Z\s]*$/) ){ // de la A a la Z DEBE SER STRING en minuscula o mayusc 
        errors.name ="No numbers or symbols are allowed in the name "
    }
    else if(!input.minHeight){    // ALTURA MIN
        errors.minHeight ="enter the minimum height please";
    }else if( parseInt(input.minHeight) > parseInt(input.maxHeight)){ // parseInt() convierte una cadena en entero
        errors.minHeight = "The minimum height cannot be greater than the maximum height";
    }else if(input.minHeight < 0){
        errors.minHeight = "Negative numbers are not allowed "
    }
    else if(!input.maxHeight){  // ALTURA MAX
        errors.maxHeight ="enter the miximum height please";
    }else if( parseInt(input.maxHeight) < parseInt(input.minHeight) ){
        errors.maxHeight = "The miximum height cannot be minor than the minimum height";
    }
    else if(!input.minWeight){ // PESO MIN
        errors.minWeight ="enter the minimum Weight please";
    }else if( parseInt(input.minWeight) > parseInt(input.maxWeight)){
        errors.minWeight = "The minimum weight cannot be greater than the maximum weight";
    }
    else if(!input.maxWeight){ // PESO MAX
        errors.maxWeight ="enter the miximum Weight please";
    }else if( parseInt(input.maxWeight) < parseInt(input.minWeight) ){
        errors.maxWeight = "The maximum height cannot be minor than the minimum height";
    }
    else if(!input.minlife_span){ // TIEMPO DE VIDA MIN
        errors.minlife_span ="enter the minimum years please";
    }else if( parseInt(input.minlife_span) > parseInt(input.maxlife_span)){
        errors.minlife_span = "The minimum years cannot be greater than the maximum years";
    }
    else if(!input.maxlife_span){ // TIEMPO DE VIDA MAX
        errors.maxlife_span ="enter the miximum years please";
    }else if( parseInt(input.maxlife_span) < parseInt(input.minlife_span) ){
        errors.maxlife_span = "The maximum years cannot be minor than the minimum years";
    }
    if(!errors.name && !errors.minHeight && !errors.maxHeight && !errors.minWeight && !errors.maxWeight && !errors.minlife_span && !errors.maxlife_span){
        document.getElementById("buttonCreate").disabled = false;
    }
    
    return errors;

    
}