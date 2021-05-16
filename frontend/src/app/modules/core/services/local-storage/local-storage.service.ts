import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  save(key: string, value: string) :void {
    localStorage.setItem(key, value);
  }

  get(key: string): string {
    return <string>localStorage.getItem(key);
  }

  saveOject(key: string, object: Object) :void {
    localStorage.setItem(key, JSON.stringify(object));
  }

  getOject(key: string) :Object {
    return JSON.parse(<string>localStorage.getItem(key));
  }

  remove(key: string) :void {
    localStorage.removeItem(key);
  }

}
