import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private budgets: any[] = [];
  private budgetAdded = new Subject<any>();

  constructor() { }

  calculateTotalCost(numPages: number, numLanguages: number): number {
    return numPages * numLanguages * 30;
  }

    // Agregar un presupuesto al array
    addBudget(budget: any) {
      this.budgets.push(budget);
    }

    // Obtener la lista de presupuestos
    getBudgets() {
      return this.budgets;
    }

    onBudgetAdded() {
      return this.budgetAdded.asObservable();
    }
}
