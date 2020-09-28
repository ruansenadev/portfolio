import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from '../post';

@Component({
  selector: 'app-blog-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css']
})
export class PostDialogComponent {
  constructor(public dialogRef: MatDialogRef<PostDialogComponent> , @Inject(MAT_DIALOG_DATA) public post: Post) { }
  onCancel(): void {
    this.dialogRef.close();
  }
}
