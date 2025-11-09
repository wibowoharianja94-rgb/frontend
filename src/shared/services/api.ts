import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Api {
  apiNode = 'http://localhost:3000'; // sesuaikan kalau beda

  constructor(private httpClient: HttpClient) {}

  getCatalog(vData: any) {
  return this.httpClient.post(this.apiNode + '/catalog/get', vData);
}

addCatalog(vData: any) {
  return this.httpClient.post(this.apiNode + '/catalog/add', vData);
}

editCatalog(vData: any) {
  return this.httpClient.post(this.apiNode + '/catalog/edit', vData);
}

deleteCatalog(vData: any) {
  return this.httpClient.post(this.apiNode + '/catalog/delete', vData);
}

}
