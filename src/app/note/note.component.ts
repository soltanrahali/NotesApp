import { not } from '@angular/compiler/src/output/output_ast';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NoteService } from '../services/note.service';
 
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

  constructor(private noteService: NoteService) { }

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

}
