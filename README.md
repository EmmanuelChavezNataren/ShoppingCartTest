# ShoppingCartTest

-INFO PROYECTO
cli packages: (\npm\node_modules)

    @ionic/cli-utils  : 1.19.3
    ionic (Ionic CLI) : 3.20.1

global packages:

    cordova (Cordova CLI) : not installed

local packages:

    @ionic/app-scripts : 3.2.4
    Cordova Platforms  : android 7.0.0
    Ionic Framework    : ionic-angular 3.9.9

System:

    Node : v10.16.3
    npm  : 7.6.3
    OS   : Windows 10

Environment Variables:

    ANDROID_HOME : not set

Misc:

    backend : pro
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
-DESCARGAR PROYECTO.
1.- Entra a la termina de tu computador.
2.- Ejecuta el comando git clone -b developer https://github.com/EmmanuelChavezNataren/ShoppingCartTest.git <directory en donde quieres almacenar el proyecto>
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
-DESPUES DE DESCARGAR EL PROYECTO.
1.- Dentro del proyecto correr el comando 'npm install'.

2.- Añadir la plataforma deseada. ionic platform add (elijes la plataforma ios o android).
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
-COMENTARIOS SOBRE LAS PLATAFORMAS.
1.- Para generar un apk para android ejecutar los siguientes comandos
	
>npm install @ionic/app-scripts@latest --save-dev
>ionic cordova build android --minifyjs --minifycss --optimizejs

2.-Una vez se ejecutó el segundo comando nos vamos a la ruta del projecto \ShoppingCartTest\platforms\android\app\build\outputs\apk\debug\
y copiamos el archivo app-debug.apk a nuestro dispositivo para instalarlo.

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
-PAQUETES
PAQUETE ANDROID com.virket.box.test.shopping.cart