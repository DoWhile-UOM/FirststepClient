import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

interface Skill{
	skill_name: string;
	skill_id: number;
  }
  
interface Job{
	job_number: number;
	title: string;
	country: string;
	city: string;
	employeement_type: string;
	arrangement: string;
	is_experience_required: string;
	salary: string;
	submission_deadline: string;
	posted_date: string;
	job_description: string;
	field_name: string;
	company_name: string;
	skills: Skill[];
}

@Component({
	selector: 'app-advertisement-view',
	standalone: true,
	templateUrl: './advertisement-view.component.html',
	styleUrl: './advertisement-view.component.css',
	imports: [MatButtonModule, CommonModule, MatChipsModule]
})
export class AdvertisementViewComponent implements OnInit{
	@Input() adData!: Job;

	constructor() { }

	ngOnInit(): void {}
}