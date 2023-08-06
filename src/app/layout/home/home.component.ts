import { Component, OnInit } from '@angular/core';Location
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/data-share.service';
import { AuthenticationGaurd } from 'src/app/services/authentication-guard.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  datesearch!: string;
  searchResults: any = [];

  constructor(
    public router: Router, 
    private authentic: AuthenticationGaurd,
    private location: Location,
    private noteService: NoteService
    ) { }

  menuVisible = false;

  ngOnInit(): void {
  }

  backClicked() {
   this.router.navigate(['/home'])
  }

  mouseEnter(){
    this.menuVisible = true;
  }

  mouseLeave() {
    setTimeout(() => {
      this.menuVisible = false;
    }, 1000)
  }

  goToAll(){
    this.router.navigate(["/home/all"])
  }

  goToCreate(){
    this.router.navigate(["/home/create"])
  }

  logout(){
    this.authentic.logoutUser().subscribe((response) => {
      console.log(response)
    },
    error => {
      console.log(error)
    });
    this.authentic.removeUserInfoUpOnLogout();
    this.router.navigate([""])
  }

  searchByDate(){
    this.noteService.searchByDate(this.datesearch).subscribe((data: any) => {
      this.searchResults = [...data];
      console.log("==========>")
      console.log(this.searchResults)
    })
  }

}
