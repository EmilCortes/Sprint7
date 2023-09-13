import { Presupuesto } from './../../../interfaces/presupuesto.model';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BudgetService } from 'src/app/services/budget.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HelpModalComponent } from "../../help-modal/help-modal.component";


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {

  @Output() costChanged = new EventEmitter<number>();
  @Output() inputValuesChanged = new EventEmitter<{ numPages: number, numLanguages: number }>();
  panelForm!: FormGroup;

  numPages: number = 1;
  numLanguages: number = 1;

  presupuesto: Presupuesto = {
    budgetName: '',
    clientName: '',
    totalPrice: 0,
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    numPages: 1,
    numLanguages: 1,
    fechaCreacion: new Date().toLocaleDateString(),
  };

  constructor(
    private formBuilder: FormBuilder,
    private budgetService: BudgetService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.panelForm = this.formBuilder.group({
      numPages: [1],
      numLanguages: [1]
    });

  }

  calculateCost(): void {
    const numPages = this.panelForm.get('numPages')?.value;
    const numLanguages = this.panelForm.get('numLanguages')?.value;

    const totalCost = this.budgetService.calculateTotalCost(numPages, numLanguages);

    this.costChanged.emit(totalCost);

    this.inputValuesChanged.emit({
      numPages: numPages,
      numLanguages: numLanguages
    });
  }

  incrementOrDecrement(fieldName: string, operation: 'increment' | 'decrement'): void {
    let currentValue = this.panelForm.get(fieldName)?.value;

    if (operation === 'increment') {
      this.panelForm.get(fieldName)?.setValue(currentValue + 1);
      currentValue += 1
    } else if (operation === 'decrement' && currentValue > 1) {
      this.panelForm.get(fieldName)?.setValue(currentValue - 1);
      currentValue -= 1
    }

    this.calculateCost();

    // Actualizar las propiedades numPages y numLanguages en el objeto presupuesto
    if (fieldName === 'numPages') {
      this.presupuesto.numPages = currentValue;
    } else if (fieldName === 'numLanguages') {
      this.presupuesto.numLanguages = currentValue;
    }

    // Emitir los valores de numPages y numLanguages cuando cambian
    this.inputValuesChanged.emit({
      numPages: this.presupuesto.numPages,
      numLanguages: this.presupuesto.numLanguages
    });

  }


  openHelpModal(field: string) {
    const modalRef = this.modalService.open(HelpModalComponent);
    modalRef.componentInstance.field = field;
  }
}

