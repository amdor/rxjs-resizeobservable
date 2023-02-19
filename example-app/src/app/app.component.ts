import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResizeObservableService } from './index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  zero?: HTMLElement | null;
  first?: HTMLElement | null;
  sub1: Subscription | undefined;
  sub2: Subscription | undefined;

  ngOnInit() {
    const service = new ResizeObservableService();
    this.zero = document.getElementById('zero');
    this.first = document.getElementById('first');
    this.sub1 = service
      .resizeObservable(this.zero!)
      .subscribe((a) => console.log(JSON.stringify(a.borderBoxSize[0].inlineSize)));
    this.sub2 = service
      .widthResizeObservable(this.first!)
      .subscribe((a) => console.log(JSON.stringify(a)));
  }

  toggle() {
    var x = document.getElementById('thisMightDisappear')!;
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  unsub() {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
  }
}
