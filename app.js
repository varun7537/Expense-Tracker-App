// Define AngularJS app
var app = angular.module('expenseApp', []);

// Define the controller
app.controller('ExpenseController', function() {
    var ctrl = this;

    // Initialize expenses array
    ctrl.expenses = [];

    // Initialize new expense object
    ctrl.newExpense = {
        description: '',
        amount: '',
        category: '',
        date: ''
    };

    // Add new expense function
    ctrl.addExpense = function() {
        // Add the new expense to the expenses array
        ctrl.expenses.push({
            description: ctrl.newExpense.description,
            amount: parseFloat(ctrl.newExpense.amount),
            category: ctrl.newExpense.category,
            date: ctrl.newExpense.date
        });

        // Reset newExpense form
        ctrl.newExpense = {
            description: '',
            amount: '',
            category: '',
            date: ''
        };
    };

    // Filtered expenses based on category and date range
    ctrl.filteredExpenses = function() {
        return ctrl.expenses.filter(function(expense) {
            var isCategoryMatch = !ctrl.filterCategory || expense.category === ctrl.filterCategory;
            var isStartDateMatch = !ctrl.filterStartDate || new Date(expense.date) >= new Date(ctrl.filterStartDate);
            var isEndDateMatch = !ctrl.filterEndDate || new Date(expense.date) <= new Date(ctrl.filterEndDate);
            return isCategoryMatch && isStartDateMatch && isEndDateMatch;
        });
    };

    // Calculate total expenses based on filtered data
    ctrl.totalExpenses = function() {
        var total = 0;
        ctrl.filteredExpenses().forEach(function(expense) {
            total += expense.amount;
        });
        return total;
    };
});
