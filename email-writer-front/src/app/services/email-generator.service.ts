import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EmailRequestDto } from 'src/app/model/EmailRequestDto';

@Injectable({
  providedIn: 'root'
})
export class EmailGeneratorService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Generates an email based on the provided email data by calling Gemini API.
   * @param emailData The data required to generate the email.
   * @returns An Observable emitting the generated email as a string.
   */
  generateEmail(emailData: EmailRequestDto): Observable<string> {
    return this.http.post(`${this.apiUrl}/generate`, emailData, { 
      responseType: 'text' 
    });
  }

}
