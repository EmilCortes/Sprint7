import { Component, OnInit } from '@angular/core';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-pressupost-list',
  templateUrl: './pressupost-list.component.html',
  styleUrls: ['./pressupost-list.component.css']
})
export class PressupostListComponent implements OnInit {


  organizedBudgets: any[] = []; // Para almacenar la lista ordenada actual
  alphabeticalOrder: boolean = false;
  orderDate: boolean = false;
  searchTerm: string = '';
  searchResults: any[] = [];
  searchError: boolean = false;

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    // Obtiene los presupuestos del servicio
    this.organizedBudgets = this.budgetService.getBudgets();
  }

  orderAlphabetically() {
    if (this.alphabeticalOrder) {
      this.organizedBudgets.sort((a, b) => a.budgetName.localeCompare(b.budgetName));
    } else {
      this.organizedBudgets.sort((a, b) => b.budgetName.localeCompare(a.budgetName));
    }
    this.alphabeticalOrder = !this.alphabeticalOrder;
  }

  orderByDate() {
    if (this.orderDate) {
      this.organizedBudgets.sort((a, b) => a.fechaCreacion - b.fechaCreacion);
    } else {
      this.organizedBudgets.sort((a, b) => b.fechaCreacion - a.fechaCreacion);
    }
    this.orderDate = !this.orderDate;
  }

  resetOrder(): void {
    this.organizedBudgets = this.budgetService.getBudgets();
    console.log('Presupuestos después de restablecer:', this.organizedBudgets);
    this.alphabeticalOrder = false;
    this.orderDate = false;
  }


  searchBudgets() {
    this.searchResults = this.organizedBudgets.filter((budget) => {
      return budget.budgetName.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
    this.searchError = this.searchResults.length === 0;
  }

}
