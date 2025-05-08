import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { StepperModule } from 'primeng/stepper';
import { Toast } from 'primeng/toast';
import { AddBankService } from '../../services/add-bank/add-bank.service';
import { SelectService } from '../../services/helper/select.service';
import { AddBank } from '../../models/PapssProject';
import { BaseResponse } from '../../models/BaseResponse';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-bank',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FloatLabel,
    StepperModule,
    ButtonModule,
    InputTextModule,
    FloatLabel,
    FormsModule,
    DatePicker,
    Toast,
    Select,
  ],
  templateUrl: './update-bank.component.html',
  styleUrl: './update-bank.component.css',
})
export class UpdateBankComponent implements OnInit {
  private addBankService = inject(AddBankService);
  private messageService = inject(MessageService);
  private selectService = inject(SelectService);
  private router = inject(ActivatedRoute);
  // private route = inject(Router);
  Id!: number;
  statuses: string[] | undefined;
  countries: string[] | undefined;

  ngOnInit(): void {
    this.statuses = this.selectService.getStatuses();
    this.countries = this.selectService.getCountries();
    this.Id = Number(this.router.snapshot.paramMap.get('id'));
    this.getBank();
  }
  getBank() {
    this.addBankService.getProject(this.Id).subscribe({
      next: (response: BaseResponse<AddBank>) => {
        if (response.responseCode === 0) {
          this.updateBankForm.patchValue({
            bankName: response.data.bankName ?? '',
            country: response.data.country ?? '',
            currentIssue: response.data.currentIssue ?? null,
            status: response.data.status ?? 'SIT',
            sitIpAddress: response.data.sitIpAddress ?? null,
            uatIpAddress: response.data.uatIpAddress ?? null,
            preprodIpAddress: response.data.preprodIpAddress ?? null,
            prodIpAddress: response.data.prodIpAddress ?? null,
            sitDate: response.data.sitDate
              ? new Date(response.data.sitDate)
              : null,
            uatDate: response.data.uatDate
              ? new Date(response.data.uatDate)
              : null,
            preprodDate: response.data.preprodDate
              ? new Date(response.data.preprodDate)
              : null,
            prodDate: response.data.prodDate
              ? new Date(response.data.prodDate)
              : null,
          });
        } else {
          this.updateBankForm.reset();
        }
      },
      error: (error) => {
        console.log(`An error occurred=====>>`, error);
        this.updateBankForm.reset();
      },
    });
  }

  updateBankForm = new FormGroup({
    bankName: new FormControl('', Validators.required),
    country: new FormControl<string | null>(null),
    sitIpAddress: new FormControl<string | null>(null),
    uatIpAddress: new FormControl<string | null>(null),
    preprodIpAddress: new FormControl<string | null>(null),
    prodIpAddress: new FormControl<string | null>(null),
    status: new FormControl<string | null>(null),
    currentIssue: new FormControl<string | null>(null),
    sitDate: new FormControl<Date | null>(null),
    uatDate: new FormControl<Date | null>(null),
    preprodDate: new FormControl<Date | null>(null),
    prodDate: new FormControl<Date | null>(null),
  });

  updateBank() {
    if (this.updateBankForm.valid) {
      const data: AddBank = this.updateBankForm.value as AddBank;

      this.addBankService.updateProject(data, this.Id).subscribe({
        next: (response: BaseResponse<any>) => {
          if (response.responseCode === 0) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.responseMessage,
            });
            this.getBank();
          } else if (response.responseCode === 2) {
            this.messageService.add({
              severity: 'error',
              summary: 'Failed to update',
              detail: response.responseMessage,
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Failed to update Bank',
              detail: response.responseMessage || 'An unknown error occurred.',
            });
          }
        },
        error: (error) => {
          console.log(`An error occurred======>>>`, error);
          this.messageService.add({
            severity: 'error',
            summary: 'An error occurred',
            detail: `Network error`,
          });
        },
      });
    }
  }
}
