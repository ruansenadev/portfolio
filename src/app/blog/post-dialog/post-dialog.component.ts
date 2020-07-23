import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Post } from "../post";

@Component({
  selector: 'blog-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css']
})
export class PostDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<PostDialogComponent> , @Inject(MAT_DIALOG_DATA) public post: Post) { }
  ngOnInit(): void {
  }
  onCancel(): void {
    this.dialogRef.close()
  }
}
