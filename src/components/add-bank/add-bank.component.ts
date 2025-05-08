import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddBank } from '../../models/PapssProject';
import { AddBankService } from '../../services/add-bank/add-bank.service';
import { BaseResponse, Country, Status } from '../../models/BaseResponse';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SelectService } from '../../services/helper/select.service';

@Component({
  selector: 'app-add-bank',
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
  templateUrl: './add-bank.component.html',
  styleUrl: './add-bank.component.css',
})
export class AddBankComponent implements OnInit {
  private addBankService = inject(AddBankService);
  private messageService = inject(MessageService);
  private selectService = inject(SelectService);
  statuses: string[] | undefined;
  countries: string[] | undefined;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.statuses = this.selectService.getStatuses();
    this.countries = this.selectService.getCountries();
  }

  addBankForm = new FormGroup({
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

  addBank() {
    if (this.addBankForm.valid) {
      this.isLoading = true;
      const data: AddBank = this.addBankForm.value as AddBank;

      this.addBankService.addProject(data).subscribe({
        next: (response: BaseResponse<any>) => {
          if (response.responseCode === 0) {
            this.isLoading = false;
            this.messageService.add({
              severity: 'success',
              summary: response.responseMessage,
              detail: response.data,
            });
            this.addBankForm.reset();
          } else if (response.responseCode === 2) {
            this.isLoading = false;
            this.messageService.add({
              severity: 'error',
              summary: response.responseMessage,
              detail: response.data,
            });
          } else {
            this.isLoading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Failed to add Bank',
              detail: response.data || 'An unknown error occurred.',
            });
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.log(`An error occurred======>>>`, error);
          this.messageService.add({
            severity: 'error',
            summary: 'Failed to add bank',
            detail: `Network error,Try again later`,
          });
        },
      });
    }
  }
}
