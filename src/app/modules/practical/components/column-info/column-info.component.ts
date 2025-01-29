import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { IConvertObservationData } from '../../../../models/practical.model';
import { DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActiveTabDirective } from '../../../../shared/directives/active-tab.directive';

@Component({
  selector: 'app-column-info',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule, ActiveTabDirective],
  templateUrl: './column-info.component.html',
  styleUrl: './column-info.component.scss',
})
export class ColumnInfoComponent implements OnInit, AfterContentInit {
  formData!: FormGroup;
  @Input('dataSource') dataSource: IConvertObservationData[] = [];
  @ViewChild('constructionCountInput') constructionCountInput!: ElementRef;
  @ViewChild('lengthOfRoadInput') lengthOfRoadInput!: ElementRef;
  @ViewChild('appActiveTab') appActiveTab!: ElementRef;
  @ViewChild(ActiveTabDirective) activeTabDirective!: ActiveTabDirective;
  @Output('submitEvent') submitData =
    new EventEmitter<IConvertObservationData>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formData = this.fb.group({
      samplingTime: [],
      projectName: [],
      constructionCount: [],
      isCompleted: [],
      lengthOfRoad: [],
    });
  }

  ngAfterContentInit(): void {
    this.loadDataForm(this.dataSource[0]);
  }

  loadDataForm(item: IConvertObservationData) {
    this.formData.patchValue(item);
  }

  submit() {
    if (this.formData.valid) {
      this.submitData.emit(this.formData.value);
    }
  }

  constructionCountEvent(buttonType: string, couteInput: HTMLInputElement) {
    this.couterBtn(buttonType, couteInput, "constructionCount");

  }

  lengthOfRoadEvent(buttonType: string, couteInput: HTMLInputElement) {
    this.couterBtn(buttonType, couteInput, "lengthOfRoad");
  }

  validateNumber(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  private couterBtn(
    buttonType: string,
    couteInput: HTMLInputElement,
    inputName: string
  ) {
    let value = parseInt(couteInput.value) || 0;

    if (buttonType === 'up') {
      value += 1;
    } else if (buttonType === 'down') {
      value -= 1;
      value = Math.max(0, value);
    }

    couteInput.value = value.toString();
    if (this.formData.get(inputName)) {
      this.formData.get(inputName)?.setValue(value);
    } else {
      console.error("Form control not found.");
    }
  }
}
