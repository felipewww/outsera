import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class ApiService {

  private baseUrl = 'https://challenge.outsera.tech/api'

  protected abstract resourcePath: string;

  constructor(private http: HttpClient) {}

  get<RESPONSE>(path: string): Observable<RESPONSE> {
    return this.http.get<RESPONSE>(
      this.mountUrl(path)
    );
  }

  private mountUrl(path: string): string {
    return `${this.baseUrl}/${this.resourcePath}${path}`
  }

  protected toQueryParams(params: Record<string, any>): string {
    return new URLSearchParams(params).toString();
  }
}
