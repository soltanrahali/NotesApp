import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  buttonContent: string = 'Create'

  noteForm = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
    favorite: new FormControl(''),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private noteService: NoteService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if(id) {
      this.buttonContent = 'Edit'
      this.noteService.getDataById(id).subscribe(data => {
        console.log("data for EDIT IS ")
        console.log(data)
        this.noteForm.patchValue(data);
      });
    } 
  }

  createNote(){
    console.log("Form val")
    console.log(this.noteForm)
    console.log("note form value is")
    console.log(this.noteForm.value)
    const id = this.route.snapshot.params['id'];
    if(id) {
      this.noteService.editNote(id,this.noteForm.value).subscribe((data: any) => {
        console.log("Success")
        console.log(data)
        this.router.navigate(["home"], )
      },
      error => {
        console.log("Error")
        console.log(error)
      })
    }else{
      this.noteService.createNote(this.noteForm.value).subscribe((data: any) => {
        console.log("Success")
        console.log(data)
        this.router.navigate(["home"], )
      },
      error => {
        console.log("Error")
        console.log(error)
      })
    }
  }
}


// <!-- {
//   "title":"Note 45",
//   "body": "note body test one two music",
//   "favorite": "false"
// } -->