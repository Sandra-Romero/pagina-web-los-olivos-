$(document).ready(function(){
      
    $("#cotizacion").click(function(){
        Limpiar();//limpia los campos del modal
            MostrarModal();
    });

    $("#enviar").click(function(){

        Cotizar();
    });

});


function MostrarModal(){
    $("#modal").modal('show');
} 

function ValidarCajas(){
    var respuesta=true;
    if($("#nombre").val()==""){
        respuesta=false;
    }
    if($("#telefono").val()==""){
        respuesta=false;
    }
    if($("#correo").val()==""){
        respuesta=false;
    }
    if($("#detalle").val()==""){
        respuesta=false
    }
    return respuesta;
}

function Limpiar(){
    $("#nombre").val(null);
    $("#telefono").val(null);
    $("#correo").val(null);
    $("#detalle").val(null);
}

function EnviarCorreo(){
    var datos={
        nombre:$("#nombre").val(),
        correo:$("#correo").val(),
        telefono:$("#telefono").val(),
        detalle:$("#detalle").val()
    };
    
    $.ajax({
        url:"../js/php/email.php",
        type:"POST",
        data:JSON.stringify(datos),
        contentType:"application/json",
        success: function(response){
            var j=JSON.parse(response);
            if(j.error>0){
                swal({
                    title: "Ups!!",
                    text:j.respuesta
                  });
            }else{
                swal({
                    title: "Peticion Enviada!!",
                    text:j.respuesta
                  });
                  $("#modal").modal('hide');
            }
            
    
        },
        error:function(error){
                console.log(error.responseText());
        }
    
    });

}

function Cotizar(){

    let res=ValidarCajas();
    if(res==true){
        EnviarCorreo();
    }else{
        swal({
            title: "Advertencia!",
            text: "Debes llenar todos los campos!",
            
          });
    }
}