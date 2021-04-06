import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@ionic-native/network';
import { Toast } from '@ionic-native/toast';
import { ConstantsProvider } from '../constants/constants';
import { DataError } from '../../dto/data-error-dto';
import { File } from '@ionic-native/file';
import { EmailComposer } from '@ionic-native/email-composer';

/*
  Generated class for the UtilitiesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
/**
 * Clase para declarar logica de utileria  para toda la aplicacion
 * @author Emmanuel Ch&aacute;vez
 *  */
@Injectable()
export class UtilitiesProvider {
  readonly CLASS_NAME: "UtilitiesProvider";
  private loading: any;
  private loaderTimeout: number;
  private dataError: DataError = new DataError(); 

  constructor(
    private network: Network,
    private loadingCtrl: LoadingController,
    private translateService: TranslateService,
    private toast: Toast,
    private alertCtrl: AlertController,
    private emailComposer: EmailComposer,
    private file: File,
    public modal: ModalController) {    
  }

    /**
   *  M&eacute;todo para el uso de cambio de idioma.
   */
     translate(key: string, params?: Object): string {
      let value: string = undefined;
      this.translateService.get(key, params).subscribe((trlValue) => {
        value = trlValue;
      }, (error) => {
        console.error(JSON.stringify(error));
      }
        , () => {
          value = value == key ? undefined : value;
        })
      return value;
    }

  /**
   * M&eacute;todo que valida si el dispositivo tiene red a internet.
   * @param on Par&aacute;metro que se establece una vez se cumpla la condici&oacute;n de que estas en linea
   */
  networkStatus(on?: () => void) {

    let title: string = this.translate("NETWORK_ERROR");
    let description: string = this.translate("NETWORK_MESSAGE");
    let button: string = this.translate("BUTTON_OK");

    if (this.network.type) {
      if (this.network.type !== "none") {
        if (on) on();
      } else {
        this.hideLoader();
        this.showBasicAlert(title, description, button);
      }
    } else {
      if (navigator.onLine) {
        if (on) on();
      } else {
        this.hideLoader();
        this.showBasicAlert(title, description, button);
      }
    }
  }

    /**
   * M&eacute;todo que valida que no haya campos nulos.
   * @param value Campo a validar
   */
     isNull(value): any {
      const valAux = JSON.stringify(value);
      return (value === null
        || value === undefined
        || value === ""
        || value === " "
        || value === {}
        || value === []
        || value === "null"
        || value === "undefined"
        || valAux === "null"
        || valAux === "{}"
        || valAux === "[]"
      )
    }

      /**
   * M&eacute;todo que muestra el componente Loading
   * con el mensaje que recibe como par&aacute;metro
   * @param defaultMessage Mensaje que se mostrará en en caso de no encontrar la clave
   * @param messageKey Clave para traducir el mansaje al idioma de la app
   */
  showLoader(defaultMessage: string, messageKey?: string): void {
    let message: string;
    if (messageKey) {
      message = this.translate(messageKey);
    }
    message = message == undefined ? defaultMessage : message;
    this.loading = this.loadingCtrl.create({
      content: message,
    });
    this.loaderTimeout = this.setTimeoutLoader();
    return this.loading.present();
  }


  /**
   * M&eacute;todo que oculta el Loader.
   */
   hideLoader(onSuccess?: any) {
    if (this.loading) {
      this.loading.dismiss().then(() => {
        if (onSuccess)
          onSuccess();
      }).catch((_e) => {
        console.log(_e)
        if (onSuccess)
          onSuccess();
      });
    }

    if (this.loaderTimeout) {
      clearTimeout(this.loaderTimeout);
      this.loaderTimeout = null;
    }
  }

    /**
   * Muestra un mensaje al usuario por medio de Toast(mensaje r&aacute;pido)
   * @param defaultMessage Mensaje por defecto en caso de no encontrar la clave de traducci&oacute;n
   * @param translateKey Clave del mensaje pra traducci&oacute;n
   * @param duration Duraci&oacute;n del mensaje por defecto es 2000 ms
   * @param position Posici&oacute;n del mensaje, por defecto se muestra en el centro
   */
     public showMessage(defaultMessage: string, translateKey?: string, duration?: string, position?: string, params?: Object): void {
      let time: string = undefined == duration ? '2000' : duration;
      let pos = undefined == position ? 'center' : position;
      let message: string = "";//this.translate(translateKey);
      if (translateKey != undefined && null != translateKey && "" != translateKey) {
        message = this.translate(translateKey, params);
      }
      this.toast.show(message ? message : defaultMessage, time, pos).subscribe(
        toast => {
        }, error => {
          console.error("No se puede mostrar Toast:" + JSON.stringify(error));
        }
      );
    }

      /*
   *M&eacute;todo para mostrar un alerta basica
   */
  showBasicAlert(title, subTitle, buttonMessage, buttonAction?) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [{ text: buttonMessage, handler: () => { if (buttonAction) buttonAction(); } }]
    });
    alert.present();
  }

  /**
   * M&eacute;todo para establecer el timeout de la aplicaci&oacute;n
   * @returns Tiempo establecido para el timeout
   */
  setTimeoutLoader(): number {
    localStorage.setItem("isTimeOutError", "false");
    return setTimeout(() => {
      this.showBasicAlert(this.translate('NETWORK_ERROR'),
        this.translate('NETWORK_MESSAGE'),
        this.translate('BUTTON_OK'));
      localStorage.setItem("isTimeOutError", "true");
      this.loading.dismiss();
    }, 120000);
  }

    /**
 * M&eacute;todo para darle formato al error
 * @param className : Nombre de la case donde el metodo es invocado
 * @param methodName : Nombre del método en el cual se invovca
 * @param message : mensaje del error que se originio
 * @param service : PATH del servicio que se  intentó ejecutar y caus&oacute; el problema
 * @param alertTitle : Titulo del mensaje de alerta que se mostrar&aacute;
 * @param alertMessage: Mensaje a mostrar al usuario.
 */
     createError(className, methodName, message, service, alertTitle, alertMessage) {

      var date: string = new Date().toLocaleDateString();
      var hours = new Date().getUTCHours() - 5;
      var minutes = new Date().getUTCMinutes();
      var seconds = new Date().getUTCMilliseconds();
      var hour = hours + ":" + minutes + ":" + seconds;
      this.dataError.class = className;
      this.dataError.method = methodName;
      this.dataError.message = message;
      this.dataError.date = date;
      this.dataError.hour = hour;
      this.writeFile(this.dataError, false, service, message, alertTitle, alertMessage)
    }
  
  /** 
   * M&eacute;todo para validar si enviar el log por correo.
   */
   validateSendEmail(service: string, messageError: any, alertTitle: string, alertMessage: string) {

    var serviceUrl = localStorage.getItem("serviceStorage");
    var error = localStorage.getItem("messageErrorStorage");

    if (serviceUrl == service && error == messageError) {
      this.alertConfirm(alertMessage);
      localStorage.setItem("serviceStorage", "");
      localStorage.setItem("messageErrorStorage", "");
    } else {

      localStorage.setItem("serviceStorage", service);
      localStorage.setItem("messageErrorStorage", messageError);

      this.translateService.get("BUTTON_OK")
        .subscribe(data => {
          var buttonAcept = data;
          this.showBasicAlert(alertTitle, alertMessage, buttonAcept)
        });
    }
  }

    /** 
    * M&eacute;todo para escribir en un archivo que va a servir como log
    * @param message mensaje del error que se originio
    * @param replace
    * @param service PATH del servicio que se  indescenató ejecutar y caus&oacute; el problema
    * @param messageError Mensaje del error que se originio
    * @param alertTitle Titulo del mensaje de alerta que se mostrar&aacute;
    * @param alertMessage Mensaje a mostrar al usuario.
    */
     public writeFile(message: any, replace: boolean, service: string, messageError: any, alertTitle: string, alertMessage: string) {
      if (replace == true && message == null) {
        this.file.createFile(this.file.externalRootDirectory, ConstantsProvider.LOG_FILE, true).then((f) => {
          console.log(f);
          this.info(this.CLASS_NAME, 'Init', '<Init log file>');
        });
      } else {
        this.error(message.class, message.method, message.message);
        if (alertMessage != "") {
          this.validateSendEmail(service, messageError, alertTitle, alertMessage);
        }
      }
    }

  /**
   * M&eacute;todo para enviar el archivo a un correo.
   */
   sendEmail() {
    let email = {
      to: ['emmanuel.chavez.condor@gmail.com', 'lacc@virket.com', 'nelr@virket.com'],
      attachments: [
        this.file.externalRootDirectory + ConstantsProvider.LOG_FILE,
      ],
      subject: this.translate('LOG_SUBJECT'),
      body: this.translate('LOG_MESSAGE'),
      isHtml: true
    };
    this.emailComposer.open(email);
  }

  /**
   * M&eacute;todo que envía una alerta para validar que se envie el correo.
   */
   alertConfirm(alertMessage) {
    var message;
    var acept;
    var cancel;
    this.translateService.get("SEND_EMAIL").subscribe(data => {
      message = data
    });
    this.translateService.get("BUTTON_OK").subscribe(data => {

      acept = data;
    });
    this.translateService.get("BUTTON_CANCEL").subscribe(data => {

      cancel = data;
    });

    const prompt = this.alertCtrl.create({
      title: message,
      message: alertMessage,
      buttons: [
        {
          text: cancel,
          handler: () => {
          }
        },
        {
          text: acept,
          handler: () => {
            this.sendEmail();
          }
        }
      ]
    });
    prompt.present();
  }


  info(className: string, methodName: string, message: string, ...args) {
    this.log("INFO", className, methodName, message, args);
  }
  warn(className: string, methodName: string, message: string, ...args) {
    this.log("WARN", className, methodName, message, args);
  }
  error(className: string, methodName: string, message: string, ...args) {
    this.log("ERROR", className, methodName, message, args);
  }

  log(type: string, className: string, methodName: string, message: string, ...args) {
    if (type != null && type != undefined && className != null && className != undefined && methodName != null && methodName != undefined && message != null && message != undefined && message.length > 0) {
      args[0].forEach((val, index) => {
        message = message.replace('{' + index + '}', val);
      });
      console.info(type + " [%s] [%s - %s] " + message, this.getDateString(), className, methodName);
      this.file.writeFile(this.file.externalRootDirectory, ConstantsProvider.LOG_FILE, type + ' [' + this.getDateString() + '] [' + className + ' - ' + methodName + '] ' + message + ' \r\n', { replace: true, append: true }).then(data => {
      }, err => {
        console.error("Unable to write log file" + JSON.stringify(err));
      });
    }
  }

    /**
   * Obtiene la fecha actual del sistema, en formato YYYY-MM-DD HH-MM-SS
   * @param onlyDate Valor de solo fecha para transformar a string
   */
     getDateString(onlyDate?: boolean) {
      let f = new Date();
      let month = this.validDataDate((f.getMonth() + 1));
      let day = this.validDataDate(f.getDate());
      let hours = this.validDataDate(f.getHours());
      let minutes = this.validDataDate(f.getMinutes());
      let seconds = this.validDataDate(f.getSeconds());
      if (onlyDate)
        return f.getFullYear() + "-" + month + "-" + day;
      else
        return f.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;;
    }

      /**
   * M&eacute;todo para agregar un cero a la izquierda a los valores menores a 10.
   * @param val Fecha a validar
   */
  validDataDate(val) {
    if (val < 10) {
      return "0" + val;
    } else {
      return val;
    }
  }

    /**
   * M&eacute;todo que genera un modal en pantalla
   * @param name nombre de la pagina que fungira como modal
   * @param data objeto de datos que se enviaran al modal
   * @param success funci&oacute;n que se ejecutara al cerrar modal(devuelve datos si así se desea)
   */
     createModal(name: string, data: any, success?: any, options?: any) {
      let modal = this.modal.create(name, data, options);
      modal.onDidDismiss(data => {
        if (data)
          success(data);
      });
  
      modal.present();
    }

}
