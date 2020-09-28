import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DispatcherService {
  defaultTheme = 'light';

  getTheme(): string {
    return localStorage.getItem('theme') || this.defaultTheme;
  }
  loadTheme(theme: string): void {
    getThemeLinkElement().setAttribute('href', themesBundles[theme]);
  }
  constructor() {
    this.loadTheme(this.getTheme());
  }
  switchTheme(theme: string): void {
    localStorage.setItem('theme', theme);
    this.loadTheme(theme);
  }
}

const themesBundles = {
  light: 'DeepPurpleAmber.css',
  dark: 'PurpleGreen.css'
};

function getThemeLinkElement() {
  let el = document.getElementById('Theme');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'stylesheet');
    el.id = 'Theme';
    document.head.appendChild(el);
  }
  return el;
}
