import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/data-share.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  favoriteData: any = [];
  recentNote: any = [];
  username: string = '';

  constructor(
    private router: Router,
    public data: DataShareService,
    private noteService: NoteService) { }

  ngOnInit(): void {
    this.loadFavorite();
    console.log("LEN fav is " + this.favoriteData.length)
    this.loadRecent3();
    console.log("LEN is rec" + this.recentNote.length)
    console.log("User name ")
    const userInfo = localStorage.getItem('userinfo');
    const parsedUserInfo = JSON.parse(userInfo!);
    this.username = parsedUserInfo.username;
    console.log(this.username)
  }

  loadFavorite(){
    this.noteService.getAllFav().subscribe((data: any) => {
      console.log('data is')
      console.log(data)

      this.favoriteData = [...data];
    })
  }

  loadRecent3(){
    this.noteService.getRecent().subscribe((data: any) => {
      console.log('data is')
      console.log(data)

      this.recentNote = [...data];
    })
  }

  load(){
    this.loadFavorite();
    this.loadRecent3();
  }

  visit(){
     this.router.navigate(["home/admin/user"], )
  }

}
