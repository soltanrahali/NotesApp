import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-view-node',
  templateUrl: './view-node.component.html',
  styleUrls: ['./view-node.component.scss']
})
export class ViewNodeComponent implements OnInit {

  @Output() eventEmitter: EventEmitter<any> = new EventEmitter<any>();


  constructor( 
    @Inject(MAT_DIALOG_DATA) public ifdata: any,
    private noteService: NoteService, 
    private router: Router) { }

  ngOnInit(): void {
    console.log('view ntoe')
    console.log(this.ifdata)
  }  

  deleteNote(){ 
    const eventData = 'delete';
    this.eventEmitter.emit(eventData);
  }

  editNote(){
    const eventData = 'edit';
    this.eventEmitter.emit(eventData);

  }


}
