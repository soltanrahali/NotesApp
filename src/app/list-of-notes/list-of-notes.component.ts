import { Component, OnInit } from '@angular/core';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-list-of-notes',
  templateUrl: './list-of-notes.component.html',
  styleUrls: ['./list-of-notes.component.scss']
})
export class ListOfNotesComponent implements OnInit {

  
  tableData: any = [];

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(){
    this.noteService.getAllNotes().subscribe((data: any) => {

      console.log('data is')
      console.log(data)

      this.tableData = [...data];

    })
  }

}
