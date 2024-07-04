import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { LineGraphComponent } from "../line-graph/line-graph.component";

@Component({
    selector: 'app-company-admin-dashboard',
    standalone: true,
    templateUrl: './company-admin-dashboard.component.html',
    styleUrl: './company-admin-dashboard.component.css',
    imports: [MatCardModule, MatCard, LineGraphComponent]
})
export class CompanyAdminDashboardComponent {

}
