import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators'

@Injectable()
export class LoaderService {

  private static loaderEnabled: boolean;

  constructor() { }

  get loaderEnabled() {
    return LoaderService.loaderEnabled;
  }

  public static showLoader() {
    LoaderService.loaderEnabled = true;
  }

  public static hideLoader() {
    LoaderService.loaderEnabled = false;
  }

}


/*  --Decorator LoaderEnabled--
Use @LoaderEnabled() above any method that returns an observable.
This would inject few lines to show the loader before actually invoking
the caller function and also adds a map and catch section to hide the
loader once the subscription is complete.
*/
export function LoaderEnabled(): MethodDecorator {

  return function (target: any, propertyKey, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function () {

      LoaderService.showLoader();
      console.log('**InjectedCode-begin--LOADERON', propertyKey);

      return original.apply(this, arguments)
        .pipe(
          map((res) => {
            console.log('**InjectedCode-map--LOADEROFF', propertyKey);
            LoaderService.hideLoader();
            return res;
          }),
          catchError((err) => {
            console.log('**InjectedCode-err--LOADEROFF', propertyKey);
            LoaderService.hideLoader();
            throw err;
          })
        );
    };
    return descriptor;
  };

}
