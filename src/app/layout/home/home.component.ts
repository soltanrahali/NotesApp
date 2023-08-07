import { Component, OnInit } from '@angular/core';Location
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private noteService: NoteService
    ) { }

  menuVisible = false;

  ngOnInit(): void {
    const currentPath = this.route.snapshot.url.join('/');
    console.log("Route ==> " + currentPath);
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
    // this.authentic.logoutUser().subscribe((response) => {
    //   console.log(response)
    // },
    // error => {
    //   console.log(error)
    // });
    // this.authentic.removeUserInfoUpOnLogout();
    this.router.navigate([""])
  }

  searchByDate(){
    console.log('Search by date ' + this.datesearch.slice(0, 10))
    // 2023-08-07T22:28:23.951Z
    this.noteService.getAllNotes().subscribe((data: any) => {
      console.log(data)
      this.searchResults = data.filter((d: any) => d.date.slice(0, 10) == this.datesearch);
      // this.searchResults = [...data];
    })
  }

}
