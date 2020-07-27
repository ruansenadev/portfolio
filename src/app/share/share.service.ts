import { Injectable } from '@angular/core';
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { SheetComponent } from "./sheet/sheet.component";
import { environment } from "../../environments/environment";
const hostUrl = environment.host

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  constructor(private shareSheet: MatBottomSheet) { }

  social = {
    'WhatsApp': 'https://wa.me/?text=',
    'Facebook': 'https://www.facebook.com/sharer/sharer.php?u=',
    'E-mail': 'mailto:foo@bar.baz?&subject=&body='
  }
  mapLinks(uri: string): { [key: string]: string } {
    return Object.entries(this.social).reduce((links, media) => {
      links[media[0]] = media[1]+encodeURIComponent((hostUrl + uri))
      return links
    }, {})
  }
  openSheet(uri: string): void {
    const links = this.mapLinks(uri)
    this.shareSheet.open(SheetComponent, {
      data: links
    })
  }
}
