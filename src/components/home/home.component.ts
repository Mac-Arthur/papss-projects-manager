import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../../services/home/home.service';
import { GetBank } from '../../models/PapssProject';
import { BaseResponse } from '../../models/BaseResponse';
import { Table, TableModule } from 'primeng/table';
import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-home',
  imports: [
    TableModule,
    CommonModule,
    InputIconModule,
    IconFieldModule,
    DatePipe,
    InputTextModule,
    RouterLink,
    Skeleton,
    UpperCasePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private homeService = inject(HomeService);
  isLoading: boolean = true;
  projects: GetBank[] = [];
  selectedProject: GetBank | null = null;
  skeleton: any[] = [];
  banksCount:number = 0;
  banksOnSit:number = 0;
  banksOnUat:number = 0;
  banksOnPreProd:number = 0;
  banksOnProd:number = 0;

  ngOnInit(): void {
    this.getProjects();
    this.skeleton = Array.from({ length: 10 }).map((_, i) => `Item #${i}`);
  }

  getProjects() {
    this.homeService.getProjects().subscribe({
      next: (response: BaseResponse<GetBank[]>) => {
        setTimeout(() => {
          if (response.responseCode === 0) {
            this.projects = response.data;
            this.banksCount = response.data.length;
            this.banksOnProd = response.data.filter(x=>x.status === "PROD").length;
            console.log(response.responseMessage);
            this.isLoading = false;
          } else {
            console.log(response.responseMessage);
            this.projects = [];
            this.isLoading = false;
          }
        }, 500);
       
      },
      error: (error) => {
        console.log('An error occured======>', error);
        this.isLoading = false;
        this.projects = [];
      },
    });
  }

  //prime ng filtering
  @ViewChild('dt') dt: Table | undefined;
  onGlobalFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (this.dt && input) {
      this.dt.filterGlobal(input.value, 'contains');
    }
  }

  openModal(project: GetBank) {
    this.selectedProject = project;
  }

  //Style badge pill
  getBadgeClass(status: string | null): string {
    switch ((status || '').toUpperCase()) {
      case 'UAT':
        return 'text-bg-secondary'; // Grey
      case 'SIT':
        return 'text-bg-primary'; // Blue
      case 'PREPROD':
        return 'text-bg-warning'; // Yellow
      case 'PROD':
        return 'text-bg-success'; // Green
      default:
        return 'text-bg-dark'; // Default/fallback
    }
  }

 
}
