//---------------------------------------------DECLARACION DE OBJETOS------------------------------------------------------------------------
class Presupuesto{
    constructor(dias,visa,dolares,opcion,id){
        this.dias=parseInt(dias);        
        this.visa=visa;
        this.dolares=dolares;        
        this.opcion=opcion;
        this.id=id;
    }    
}
//-----------------------------------------DECLARACION DE FUNCIONES-----------------------------------------------------------------------
//---funcion para calcular en base a los dias y si queres agregar la visa de eeuu
function sumaDias (dias, visa){
    let dolares = Number();  
    
    if (visa==="si") {        
        dolares = dias*100;        
        return dolares;        
    }else {
        let valor = $("#visaEEUU").val()
       
        if (valor==="si"){           
            dolares = dias*100+160;           
        }else {            
            dolares =dias *100;
        }
            return dolares;
        }     
}
//---funcion para generar el html con la salvedad de que si te vas mas de 90 dias te muestra un mensaje
function crearHTML() {
    let crear = JSON.parse(localStorage.getItem("presupuestos"));   
    // -----llamo a la funcion get url para traer el valor de los dolares de la api
    getURL();    
    if (crear !=null && crear.length!=0){        
        crear.forEach(element =>{
        if (element.dias>90){
            presupuestoHTML.append(`
                                    <div class="alert alert-primary btn--1">
                                        <p>Presupuesto N°:${(crear.indexOf(element)+1)}</p>
                                        <p>Para viajar ${element.dias} días vas a necesitar alrededor de u$s${element.dolares} dólares.</p>                                                                    
                                        <p>La opción elegida para visitar ciudades fue la número: ${element.opcion}</p>     
                                        <p>Tomando como referencia $${dolarTurista} pesos, con la cotización del dia de hoy y habiendo aplicado el 65% de impuestos al dólar oficial.</p>                                        
                                        <p class="negrita">Tu presupuesto es de: $${element.dolares*dolarTurista} pesos argentinos.</p>                                                           
                                        <p>Como vas a viajar ${element.dias} días te recomiendo que saques una visa para quedarte en Japón ya que el maximo sin visado es de 90 días D: </p>                                                                                                                
                                        <button id="btnBorrar" onclick="borrarPresupuesto(${element.id})"class="text-danger">Eliminar</button>                                        
                                    </div>`)                             
        }else{presupuestoHTML.append(`
                                    <div class="alert alert-primary btn--1">
                                        <p>Presupuesto N°:${(crear.indexOf(element)+1)}</p>
                                        <p>Para viajar ${element.dias} días vas a necesitar alrededor de u$s${element.dolares} dólares.</p>                                                                    
                                        <p>La opción elegida para visitar ciudades fue la número: ${element.opcion}</p>     
                                        <p>Tomando como referencia $${dolarTurista} pesos, con la cotización del dia de hoy y habiendo aplicado el 65% de impuestos al dólar oficial.</p>                                        
                                        <p class="negrita">Tu presupuesto es de: $${element.dolares*dolarTurista} pesos argentinos.</p>                              
                                        <button id="botonBorrar" onclick="borrarPresupuesto(${element.id})" class="text-danger">Eliminar</button>                                                                                                                
                                    </div>`)                                    
            }                
            });
    } else {
            presupuestoHTML.append(`
                        <div class="alert alert-primary btn--1">
                            <p>Aún no cargaste un presupuesto</p>                                                                                                   
                        </div>`)       
    }
}
//----funcion para guardar los presupuestos , si se borra un presupuesto no se duplica el ID y genera otro diferente
function guardarPresupuesto(){  
    let dias=Number($("#dias").val());       
    let visa=$("#visa").val();    
    let dolares=sumaDias(dias,visa);    
    let eleccion=$("#opciones").val()                            
    let presupuestoLocal=JSON.parse(localStorage.getItem("presupuestos"))        
    switch (eleccion) {
            case "1":
                dolares+=50;
                break;    
            case "2":       
                dolares+=254;
                break;
            case "3":        
                dolares+=276;
                break;
            default :
           console.log("Lo siento, no seleccionaste una opcion valida");   
        }
    // si los dias que ingresa son 0, quiere decir que no apreto el boton guardar sin agregar nada por lo que no lo tomo en cuenta para guardar los datos :)   
    if (dias>0){
        if (localStorage.getItem("presupuestos") !=null){
            let idAux=presupuestoLocal.length +1;
            for(i=0;i<presupuestoLocal.length;i++){
                if(presupuestoLocal[i].id ==idAux){
                    idAux=idAux+1;
                }
            }        
            let presupuesto= new Presupuesto(dias,visa,dolares,eleccion,idAux)
            presupuestoLocal.push(presupuesto)
            localStorage.setItem("presupuestos",JSON.stringify(presupuestoLocal))
        } else {
            localStorage.clear();        
            let idAux=1;
            let presupuesto = new Presupuesto(dias,visa,dolares,eleccion,idAux)
            presupuestos.push(presupuesto)
            localStorage.setItem("presupuestos", JSON.stringify(presupuestos))        
        } 
    }
}
//------ funcion para borrar presupuestos por ID------------------------------
function borrarPresupuesto(id){
        let borrar =JSON.parse(localStorage.getItem("presupuestos"));
        let presupuestoAux=borrar.filter(e=>e.id !=id);
        localStorage.setItem("presupuestos",JSON.stringify(presupuestoAux));        
        location.reload();         
}
//--- funcion para mostrar en html si queres agregar el valor de la visa de eeuu, siempre que hayas puesto que NO tenes visa de EEUU
function apareceVisa(event){
    if (event.target.value=="no"){
    $("#boxVisa").slideDown(1000).css("color","black").css("font-weight","bold")                
                 
    }else {
        $("#boxVisa").slideUp(1000)
    }                
}
//---- funcion para agregar un titulo al html, se utilizará con las animaciones...
function titulo(){
    $("main").prepend(`<h1 id="titulo"class="negrita texto-grande textoAlineado-cent">Simulá tu presupuesto de viaje</h1>`)   
    $("#titulo").fadeOut("slow",function(){
                                        $("#titulo").fadeIn(200) 
                                        .css("color","tomato")
                                        .css("text-decoration","underline")
                                        })                      
}
//----funcion para agregar una descripcion a la pagina--
function descripcion(){
    let URL= "despegar.com"
    let main = document.getElementById("principalMain")
    let parrafo=document.createElement('p')
    let parrafoAereo=document.createElement('p')
    parrafo.setAttribute('class','btn--1 texto-pequeno');
    parrafoAereo.setAttribute('class','btn--1 texto-pequeno')
    parrafo.textContent='Aquí podrás calcular un aproximado de cuanto gastarias en tu viaje a Japón. Se calcula que por dia deberás gastar alrededor de u$s100 por persona. Este monto incluye comidas y transporte local.'
    parrafoAereo.textContent='Recordá comprar los pasajes de avión con tiempo en la pagina de tu aerolinea favorita y seleccionar un vuelo con escala en EEUU ya que es mas economico que un vuelo directo. Tené en cuenta que para hacer escala necesitas visa estadounidense. Te recomiendo comprar tus pasajes en '
    let vinculo=document.createElement('a')
    vinculo.style.display='inline'
    vinculo.setAttribute('href',"https://www.despegar.com.ar/") 
    vinculo.setAttribute('target','_blank')   
    vinculo.textContent=URL    
    main.prepend(parrafo)
    main.append(parrafoAereo)
    parrafoAereo.append(vinculo)
}
//------funcion para generar un boton cuando scrolleo
function btnScroll(boton){
    const $ScrollBtn = $(boton);    
    $(window).scroll(function(){
        let scroll = $(this).scrollTop();        
        if (scroll > 400){$ScrollBtn.removeClass('hidden')}
        else { $ScrollBtn.addClass('hidden')};
    })
    $ScrollBtn.click(function(){
        window.scrollTo({
            behavior: 'smooth',
            top: 0
        })
    })
}
//funcion para obtener los valores desde una url del dolar
function getURL(){
    if (sessionStorage.getItem("dolarJSON") !=null){
        dolarTurista=parseFloat(JSON.parse(sessionStorage.getItem("dolarJSON")))        
    
    } else {$.get(URLGET, function (respuesta, estado) {
        if(estado === "success"){
          let misDatos = respuesta;
          let dolar=misDatos[6]//en esta posicion esta el valor del dolar que quiero obtener, es el dolar aplicado con el 65% de impuestos.
          dolarTurista=dolar.casa.venta //y de ese dolar turista elijo el valor de venta, que lo utilizo para hacer el calculo contra pesos argentinos       
          sessionStorage.setItem("dolarJSON",JSON.stringify(dolarTurista))//guardo en mi session storage el valor
        }})
    }    
}
//-------------------------------------------------------VARIABLES--------------------------------------------------------------
const URLGET = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
let presupuestos=[]
let dolarJSON=[]
let botonGuardar =$("#botonGuardar")
let visa=$("#visa")
let boxVisa= $("#boxVisa")
let presupuestoHTML = $("#presupuesto")
let botonScroll=$(".boton-scroll")
let dolarTurista =Number()
//---------------------------------------------------------LOGICA--------------------------------------------------------------
$(() => {console.log('A la espera de datos');});
//agrego un titulo a mi main
titulo();
//agrego una descripcion a la pagina, utilizo javascript con create element
descripcion();
//evento de  change para cuando seleccionas que NO tenes visa
visa.change(apareceVisa)
//evento de click para guardar un presupuesto
botonGuardar.click(guardarPresupuesto)
//agrego la funcion scroll para cuando llega al final pueda subir mediante un boton
btnScroll(botonScroll);
//crear el html con los presupuestos guardados de forma local
crearHTML();




