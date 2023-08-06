import { HttpClient, HttpParams } from "@angular/common/http";
import { not } from "@angular/compiler/src/output/output_ast";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DataShareService } from "../data-share.service";
import { endpoint } from "../enum/endpoint";

@Injectable({
    providedIn: 'root'
})
export class NoteService {
    
    url: string = environment.backendUrl
    constructor(
        private httpClient: HttpClient,
        private dataShare: DataShareService
    ){}

    // get all notes
    getAllNotes(){
        return this.httpClient.get(this.url + endpoint.ALL_NOTE);
    }

    // get all FAVORITES
    getAllFav(){
        return this.httpClient.get(this.url + endpoint.FAVORITES);
    }

    getRecent(){
        return this.httpClient.get(this.url + endpoint.RECENT);
    }

    favoriteChange(id: number, fav: string){
        const params = new HttpParams().set('favorite', fav);

        return this.httpClient.put(this.url + endpoint.NOTE + `/${id}/favorite`,  null, { params });
    }

    createNote(body: any){
        return this.httpClient.post(this.url + endpoint.CREATE_NOTE, body);
    }

    deleteNote(id: number){
        return this.httpClient.delete(this.url + endpoint.DELETE_NOTE + `/${id}`);
    }
    
    getDataById(id: number): Observable<any> {
        return this.httpClient.get<any>(`${this.url}${endpoint.NOTE}/${id}`);
    }

    editNote(id: number, note: any){
        return this.httpClient.put(this.url + endpoint.NOTE + `/${id}`, note);
    }

    searchByDate(date: string){
        const params = new HttpParams().set('date', date);

       return this.httpClient.get(this.url + endpoint.NOTE + '/search', { params } )
    }
}