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
    if(this.note.favorite) {
      this.favoriteButton = 'Remove from Favorite'
    }
  }

  favChange(){
    const vaf = !this.note.favorite + '';
    this.noteService.favoriteChange(this.note.noteId, vaf).subscribe((data: any) => {
      console.log("Data Node is -->")
      console.log(data)
      this.reloadParent.emit();
    })
    
  }

  deleteNote(){
    this.noteService.deleteNote(this.note.noteId).subscribe((data: any) => {
      this.reloadParent.emit();
    })
  }

  editNote(){
    this.router.navigateByUrl(`/home/edit/${this.note.noteId}`);   
  }

  viewNote(){
    const dialogRef = this.dialog.open(ViewNodeComponent, {
      panelClass: 'custom-dialog-container',
      data: this.note,
      position: {
        left: '31%',
        top: '90px'
      },  
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
       
    });

  }
}
