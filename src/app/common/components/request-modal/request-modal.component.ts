import { Component, Injectable, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { ModalConfig } from './modal.config';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrls: ['./request-modal.component.scss']
})

@Injectable()
export class RequestModalComponent implements OnInit {

  constructor() { }

  @Input() title: string = '';
  @Input() body: string = '';
  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();

  ngOnInit(): void {
    console.log('Modal init');
  }

  closeMe() {
    this.closeMeEvent.emit();
  }

  confirm() {
    this.confirmEvent.emit();
  }

  ngOnDestroy(): void {
    console.log(' Modal destroyed');
  }

}
