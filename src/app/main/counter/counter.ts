import { CommonModule } from '@angular/common';
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.html',
  standalone: true,
  imports: [CommonModule],
})
export class Counter {
  count = signal(0);
  doubled = computed(() => this.count() * 2);

  discount = 0;
  GST = signal(0.18);
  ngOnInit() {
    for(let i = 0; i < 1000; i++) {
        setTimeout(() => {
            this.GST.update(v => v + 0.01);
            console.log(this.GST());
        }, i * 2000);
    }
  }
  increment() {
    this.count.update(v => v + 1);
    this.discount = this.count() * 0.1;
    
  }


}
