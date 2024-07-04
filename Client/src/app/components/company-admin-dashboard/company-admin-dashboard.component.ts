import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { LineGraphComponent } from "../line-graph/line-graph.component";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { DoughnutGraphStatusComponent } from "../doughnut-graph-status/doughnut-graph-status.component";
import {MatMenuModule} from '@angular/material/menu';


@Component({
    selector: 'app-company-admin-dashboard',
    standalone: true,
    templateUrl: './company-admin-dashboard.component.html',
    styleUrl: './company-admin-dashboard.component.css',
    imports: [MatCardModule, MatCard, LineGraphComponent, MatButtonModule, MatIconModule, DoughnutGraphStatusComponent,MatMenuModule]
})
export class CompanyAdminDashboardComponent {

}
