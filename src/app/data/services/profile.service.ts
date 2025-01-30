import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Profile } from '../interfaces/profile.interface';
import { Pageble } from '../interfaces/pageble.interface';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  baseApiUrl: string = 'https://icherniakov.ru/yt-course/';

  me: WritableSignal<Profile | null> = signal<Profile | null>(null)
  filteredProfiles: WritableSignal<Profile[]> = signal<Profile[]>([])

  constructor(private http: HttpClient) {}

  getTestAccounts(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getMe(): Observable<Profile>{
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`)
    .pipe(
      tap((res: Profile) => this.me.set(res))
    )
  }

  getAccount(id:string){
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`)
  }

  getSubscribersShortList(subsAmount:number = 4): Observable<Profile[]>{
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}account/subscribers/`)
    .pipe(
      map((res: Pageble<Profile>) => res.items.slice(1,subsAmount))
    )
  }

  patchProfile(profile: Partial<Profile>) : Observable<Profile>{
    return this.http.patch<Profile>(
      `${this.baseApiUrl}account/me`,
      profile
    )
  }

  filterProfiles(params: Record<string,any>) {
    return this.http.get<Pageble<Profile>> (
      `${this.baseApiUrl}account/accounts`,
      params
      
    ).pipe(
      //@ts-ignore
      tap((res: Pageble<Profile>) => this.filterProfiles.set(res.items))
    )
  }
  
  
}
