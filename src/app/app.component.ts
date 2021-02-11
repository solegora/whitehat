import { Component, OnInit } from '@angular/core';

import { StateService } from '@services';

@Component({
  selector: 'app-root',
  template: `<app-layout></app-layout>`
})
export class AppComponent implements OnInit {
  constructor(private readonly stateService: StateService) { }

  ngOnInit(): void {
    this.stateService.initState().subscribe();
  }
}
