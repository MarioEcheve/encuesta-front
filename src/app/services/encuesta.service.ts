import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestEncuesta } from '../request/request-encuesta';
import { ResponseEncuesta } from '../response/response';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  SERVER_API_URL = environment.url;
  public resourceUrl = this.SERVER_API_URL + 'encuesta';
  constructor(private http : HttpClient) { }

  create(requestEncuesta: RequestEncuesta): Observable<ResponseEncuesta> {
    return this.http.post<ResponseEncuesta>(this.resourceUrl + '/save', requestEncuesta);
  }
  findAll(): Observable<ResponseEncuesta> {
    return this.http.get<ResponseEncuesta>(this.resourceUrl + '/findAll');
  }
}
