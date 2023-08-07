import { not } from '@angular/compiler/src/output/output_ast';
import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NoteService } from '../services/note.service';
import { ViewNodeComponent } from '../view-node/view-node.component';
 
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
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
    if(this.note.favorite == 'true' || this.note.favorite == true) {
      this.favoriteButton = 'Remove from Favorite'
    }else{
      this.favoriteButton = 'Add to Favorite'
    }
  }

  favChange(){
    const vaf = !this.note.favorite + '';
    console.log(this.note)
    console.log("Change fav val")
    if(this.note.favorite == true || this.note.favorite == 'true'){
      this.note.favorite = 'false';
    }else{
      this.note.favorite = 'true'
    }
    console.log(this.note)
    this.noteService.favoriteChange(this.note).subscribe((data: any) => {
      console.log("Data Node is -->")
      console.log(data)
      this.reloadParent.emit();
    })
    
  }

  deleteNote(){
    this.noteService.deleteNote(this.note.id).subscribe((data: any) => {
      this.reloadParent.emit();
    })
  }

  editNote(){
    this.router.navigateByUrl(`/home/edit/${this.note.id}`);   
  }

  viewNote(){
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
