import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.component.html',
})
export class HelpModalComponent {
  @Input() field!: string;

  constructor(public activeModal: NgbActiveModal) {}

  getHelpMessage(): string {
    if (this.field === 'numPages') {
      return 'Ingrese la cantidad de páginas que necesita para su proyecto.';
    } else if (this.field === 'numLanguages') {
      return 'Indique el número de idiomas en los que necesita que se traduzca su proyecto.';
    }
    return '';
  }
}
