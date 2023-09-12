import { Presupuesto } from './../../interfaces/presupuesto.model';
import { Component } from '@angular/core';
import { BudgetService } from 'src/app/services/budget.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  budgetName: string = ''; // Nuevo input para el nombre del presupuesto
  clientName: string = ''; // Nuevo input para el cliente/a
  budgets: any[] = [];

  public budgetService: BudgetService;

  constructor(private budgetServices: BudgetService, private router: Router) {
    this.budgetService = budgetServices;
  }

  checkbox1: boolean = false;
  checkbox2: boolean = false;
  checkbox3: boolean = false;
  additionalCost: number = 0;
  totalPrice: number = 0;
  showBudgetNameError: boolean = false;
  showClientNameError: boolean = false;

  numPages: number = 0;
  numLanguages: number = 0;

  presupuesto: Presupuesto = {  // Declaración de la propiedad presupuesto
    budgetName: '',
    clientName: '',
    totalPrice: 0,
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    numPages: 0,
    numLanguages: 0,
    fechaCreacion: new Date().toLocaleDateString(),
  };


  updateTotalPrice() {

    this.totalPrice = 0;

    if (this.checkbox1) {
      this.totalPrice += 500;
    }

    if (this.checkbox1 === false) {
      this.additionalCost = 0
    }

    if (this.checkbox2) {
      this.totalPrice += 300;
    }

    if (this.checkbox3) {
      this.totalPrice += 200;
    }

    this.totalPrice += this.additionalCost;
  }


  onCostChanged(newTotalCost: number) {
    this.additionalCost = newTotalCost;
    this.updateTotalPrice();
  }

  goToWelcome() {
    this.router.navigate(['/welcome']);
  }


  addBudget() {

    if (this.isInvalid(this.budgetName) || this.isInvalid(this.clientName)) {
      // Mostrar mensajes de error
      this.showBudgetNameError = this.isInvalid(this.budgetName);
      this.showClientNameError = this.isInvalid(this.clientName);
      return; // No hacer el push al array si los campos son inválidos
    }

    // Asigna los valores de numPages y numLanguages al objeto presupuesto
    this.presupuesto.numPages = this.numPages;
    this.presupuesto.numLanguages = this.numLanguages;

    // Calcula el precio total aquí después de asignar los valores
    this.presupuesto.totalPrice = this.budgetService.calculateTotalCost(this.numPages, this.numLanguages);


    const budget = {
      budgetName: this.budgetName,
      clientName: this.clientName,
      serviceSelected: '',
      totalPrice: this.totalPrice,
      checkbox1: this.checkbox1,
      checkbox2: this.checkbox2,
      checkbox3: this.checkbox3,
      numPages: this.numPages,
      numLanguages: this.numLanguages,
      fechaCreacion: new Date().toLocaleDateString(),
    };

    // Agregar el presupuesto al servicio
    this.budgetService.addBudget(budget);

    this.budgets = this.budgetService.getBudgets();

    // Limpia los campos después de agregar el presupuesto
    this.budgetName = '';
    this.clientName = '';
    this.checkbox1 = false;
    this.checkbox2 = false;
    this.checkbox3 = false;
    this.numPages = 0;
    this.numLanguages = 0;
    this.totalPrice = 0;

    // También puedes verificar la lista completa de presupuestos
    console.log('Lista de presupuestos:', this.budgetService.getBudgets());
  }

  onInputValuesChanged(eventData: { numPages: number, numLanguages: number }) {
    this.numPages = eventData.numPages;
    this.numLanguages = eventData.numLanguages;
  }

  isInvalid(value: string): boolean {
    // Verifica si el valor es null, undefined o contiene solo espacios en blanco
    return value === null || value === undefined || value.trim() === '';
  }


}
