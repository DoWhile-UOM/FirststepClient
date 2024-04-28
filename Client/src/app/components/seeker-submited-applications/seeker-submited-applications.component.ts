import { Component } from '@angular/core';
import { AdvertisementCardComponent } from "../advertisement-card/advertisement-card.component";


@Component({
    selector: 'app-seeker-submited-applications',
    standalone: true,
    templateUrl: './seeker-submited-applications.component.html',
    styleUrl: './seeker-submited-applications.component.css',
    imports: [AdvertisementCardComponent]
})
export class SeekerSubmitedApplicationsComponent {

}
