import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

export interface UploadObject {
  data: File;
  url: string;
  key: string;
  uploadRequest: Subscription;
}
export interface UploadStatus {
  isUploading: boolean;
  uploadProgress: number;
  hasUploaded: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ImageStorageService {
  fileNameRegex = /(^[\w-]+)\.(?:png$|jpg$|jpeg$|svg$|webp$)/;
  constructor(private http: HttpClient) { }
  allowFileName(fileName: string): string {
    const dateString = new Date().toLocaleString().replace(/\//g, '_').replace(/[\s:]/g, '-');
    const slices = fileName.split('.');

    if (this.fileNameRegex.test(fileName) && this.fileNameRegex.exec(fileName)[0] === fileName) {
      return `${slices[0]}_${dateString}.${slices[1]}`;
    }
    return slices.reduce((safeFileName, slice, i) => {
      if (slices.length - 1 === i) {
        return `${safeFileName}${dateString}.${slice}`;
      }
      return safeFileName += /[\w-]/g.test(slice) && slice.match(/[\w-]/g).join('') + '_';
    }, '');
  }
  validateFile(file: File): File {
    const fileName = this.allowFileName(file.name);
    const blob = file.slice(0, file.size, file.type);
    return new File([blob], fileName, { type: file.type });
  }
  getSignedUrl(fileName: string, mimeType: string, path: string): Observable<{ url: string, key: string }> {
    return this.http.get<{ url: string, key: string }>('/sign-s3', {
      params: {
        filename: fileName,
        mimetype: mimeType,
        path
      }
    });
  }
  uploadImage(url: string, file: File): Observable<number> {
    return this.http.put(url, file, { reportProgress: true, observe: 'events' })
      .pipe(
        map(uploadEvent => this.getUploadEventPercent(uploadEvent))
      );
  }
  getUploadEventPercent(ev: HttpEvent<any>): number {
    switch (ev.type) {
      case HttpEventType.Sent:
        return 0;
      case HttpEventType.UploadProgress:
        return Math.round(100 * ev.loaded / ev.total);
      case HttpEventType.Response:
        return 101;
      default:
        return NaN;
    }
  }
}


