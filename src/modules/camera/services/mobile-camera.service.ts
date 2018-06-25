import {Injectable} from '@angular/core';
import {normalizeURL} from 'ionic-angular/util/util';

@Injectable()
export class MobileCameraService {

  public getPicture(): Promise<string> {
    return new Promise((resolve, reject) => {
      const removeDomListener = () => {
        document.removeEventListener('deviceready', onCordovaDeviceReady);
      };

      const onCordovaDeviceReady = () => {
        const camera = window.navigator['camera'];

        const options = {
          quality: 50,
          destinationType: camera.DestinationType.FILE_URL,
          sourceType: camera.PictureSourceType.CAMERA,
          encodingType: camera.EncodingType.PNG,
          saveToPhotoAlbum: false,
          correctOrientation: true
        };

        camera.getPicture(imageData => {
          removeDomListener();
          resolve(normalizeURL(imageData));
        }, error => {
          removeDomListener();
          reject(error);
        }, options);
      };

      document.addEventListener('deviceready', onCordovaDeviceReady);
    });
  }

}
