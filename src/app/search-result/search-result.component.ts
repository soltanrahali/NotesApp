import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NoteService } from '../services/note.service';
import { ViewNodeComponent } from '../view-node/view-node.component';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  @Input() note: any ;

  @Output() reloadParent: EventEmitter<void> = new EventEmitter<void>();

  
  favorite: boolean = false;

  favoriteButton: string = 'Add to Favorite'

  // angular reload parent component based on event in child component

  constructor(
    private dialog: MatDialog,
    private noteService: NoteService, 
     private router: Router) { }

  ngOnInit(): void {
    console.log("Inside of Note compoent")
    console.log(this.note)
    if(this.note.favorite) {
      this.favoriteButton = 'Remove from Favorite'
    }
  }

  favChange(){
    // const vaf = !this.note.favorite + '';
    // this.noteService.favoriteChange().subscribe((data: any) => {
    //   console.log("Data Node is -->")
    //   console.log(data)
    //   this.reloadParent.emit();
    // })
    
  }

  deleteNote(){
    this.noteService.deleteNote(this.note.noteId).subscribe((data: any) => {
      this.reloadParent.emit();
    })
  }

  editNote(){
    this.router.navigateByUrl(`/home/edit/${this.note.id}`);   
  }

  viewNote(event:any){
    event.preventDefault();
    const dialogRef = this.dialog.open(ViewNodeComponent, {
      panelClass: 'custom-dialog-container',
      data: this.note,
      position: {
        left: '24%',
        top: '48px'
      },  
      width: '53%',
    });

    dialogRef.componentInstance.eventEmitter.subscribe((eventData: any) => {
      // Handle the event data emitted by the dialog component
      console.log('Event data received:', eventData);
      if(eventData == 'edit'){
        dialogRef.close();
        this.editNote();
      }
      if(eventData == 'delete'){
        dialogRef.close();
        this.deleteNote();
      }
    });
  }

}
