# Bet-control

Aqui os traigo mi proyecto final de Iron Hack , este proyecto se basa en el crecimiento en el mundo de las apuestas
y la necesidad del control de las mismas. 

Este MVP esta desarrollado con el Back en express , con la base de datos en Mongo y corriendo sobre Node. 
la parte del front esta desarrolada en Angular que recibe los datos del back en formato JSON. 
También se establecio una conexion con una api externa que proporciona los ultimos 20 resultados deportivos de el deporte seleccionado. 

La pantalla principal tras pasar el login o el signup , es la pagina del perfil donde se crean las casas de apuestas simulando 
a las reales. En esta misma pantalla podremos realizar un ingreso en una casa de apuestas en el caso en el que no dispongamos de efectivo suficiente.

En el menu lateral o en el header si estamos en la versión de escritorio el siguiente proceso es crear una apuesta. 
En este formulario podremos recrear nuestras apuestas , seleccionando la casa de apuesta en la que la vamos a realizar. 
El importe apostado sera restado de nuestra banca. 

Seccion de apuestas pendientes , en esta seccion veremos las apuestas pendientes de validar ,  pulsando en el detalle podremos marcar su estado final 
GANADA ( el importe final se suma a nuestra banca ) PERDIDA ( La apuesta queda marcada como perdida) CASH OUT ( Apuesta retirada antes de tiempo , el importe 
introducido sera el que se sume a la banca).

Resultados y Estadisticas , en este apartado de la app podremos ver nuestro beneficio real segun lo que hemos apostado y lo quye hemos ganado.
También se ofrece una estadistica de apuestas por deporte. 

El ultimo apartado de la app muestra resultados de eventos deportivos por deporte , para verificar tus apuestas deportivas.

Puedes ver esta app en bet-control.herokuapp.com 
