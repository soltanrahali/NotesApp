import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
    
}