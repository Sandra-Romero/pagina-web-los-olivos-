<?php
    $d = file_get_contents('php://input');
    $data=json_decode($d,true);
    $correo_olivos="merinocampos92@gmail.com"; 
  
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){
        
        if(isset($data)){
           
            $correo=$data['correo'];
            $detalle=$data['detalle'];
            $telefono=$data['telefono'];
            $detalle=$data['detalle'];
            //para el envío en formato HTML 
            $headers = "MIME-Version: 1.0\r\n"; 
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            $asunto = "Este mensaje es de prueba"; 
            $cuerpo = ' <html> 
                            <head> 
                            <title>Nececito informacion de sus servicios</title> 
                            </head> 
                                <body> 
                                    <h5>Mi correo es: '.$correo.'</>
                                    <h5>Me pueden contactar al siguiente telefono: '.$telefono.'</>
                                    <p> '.$detalle.' </p> 
                            </body> 
                            </html>'; 
            
            
               if( mail($correo_olivos,$asunto,$cuerpo,$headers)){
                $res=array("error"=>0,"respuesta"=>"Hemos recibido tu solicitud te enviaremos 
                la informacion al correo o telefono gracias por preferinos.");
                echo(json_encode($res));
                
                exit();
               }else{
                $res=array("error"=>1,"respuesta"=>"No se ha podido enviar la informacion intenta nuevamente");
                echo(json_encode($res));
               
                exit();
               }
       
                
                
           
            
        }else{
            echo($data["telefono"]);
            
        }

    }else{
        $res=array("error"=>1,"respuesta"=>"ERROR DE METODO");
        echo( json_encode($res));
       
        
        exit();
    }
?>