import { HttpClient, HttpParams } from "@angular/common/http";
import { not } from "@angular/compiler/src/output/output_ast";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DataShareService } from "../data-share.service";

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
        const userInfo = localStorage.getItem('userinfo');
        const  parsedUserInfo = JSON.parse(userInfo!);
        const userId = parsedUserInfo.userId;
        return this.httpClient.get("http://localhost:3000/note_note");
    }

   
    favoriteChange(note: any){
        const n = {
            title : note.title,
            body : note.body,
            favorite : note.favorite,
            date: note.date
        }
        return this.httpClient.put('http://localhost:3000/note_note/' + `${note.id}`, n, { headers: { '_method': 'PATCH' }});
    }

    createNote(body: any){
        const userInfo = localStorage.getItem('userinfo');
        const  parsedUserInfo = JSON.parse(userInfo!);
        const userId = parsedUserInfo.userId;
        return this.httpClient.post('http://localhost:3000/note_note', body)
        // return this.httpClient.post(this.url + endpoint.CREATE_NOTE + `/${userId}`, body);
    }

    deleteNote(id: number){
        return this.httpClient.delete('http://localhost:3000/note_note' + `/${id}`);
    }
    
    getDataById(id: number): Observable<any> {
        return this.httpClient.get<any>('http://localhost:3000/note_note' + `/${id}`);
    }

    editNote(id: number, note: any){
        const n = {
            title : note.title,
            body : note.body,
            favorite : note.favorite,
            date: note.date
        }
        return this.httpClient.put('http://localhost:3000/note_note/' + `${id}`, n, { headers: { '_method': 'PATCH' }});
    }

   
}