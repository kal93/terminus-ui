import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  MatCheckbox,
  MatCheckboxChange,
} from '@angular/material';
import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { TsStyleThemeTypes } from './../utilities/types';
import { TsReactiveFormBaseComponent } from './../utilities/reactive-form-base.component';


/**
 * Custom control value accessor for our component
 * This allows our custom components to access the underlying form validation via the base class
 */
/* tslint:disable:no-use-before-declare */
export const CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TsCheckboxComponent),
  multi: true,
};
/* tslint-enable: no-use-before-declare */


/**
 * This is the checkbox UI Component
 *
 * #### QA CSS CLASSES
 * - `qa-checkbox`: The checkbox input element
 *
 * @example
 * <ts-checkbox
 *              [formControl]="yourHelperToGetFormControl('rememberMe')"
 *              isChecked="true"
 *              isDisabled="false"
 *              isIndeterminate="false"
 *              isRequired="false"
 *              (inputChange)="myMethod($event)"
 *              (indeterminateChange)="myMethod($event)"
 * ></ts-checkbox>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  host: {
    class: 'ts-checkbox',
  },
  providers: [CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TsCheckboxComponent extends TsReactiveFormBaseComponent implements AfterViewInit {
  /**
   * Store the `isChecked` value
   */
  private _isChecked: boolean = false;

  /**
   * Toggle the underlying checkbox if the isChecked property changes
   */
  @Input()
  public get isChecked(): boolean {
    return this.checkbox.checked;
  }
  public set isChecked(v: boolean) {
    this.checkbox.checked = v;
  }

  /**
   * Define if the checkbox is disabled
   */
  @Input()
  public isDisabled: boolean = false;

  /**
   * Define if the checkbox should be indeterminate
   */
  @Input()
  public isIndeterminate: boolean = false;

  /**
   * Define if the checkbox is required
   */
  @Input()
  public isRequired: boolean = false;

  /**
   * Toggle the underlying checkbox if the ngModel changes
   */
  @Input()
  public set ngModel(v: boolean) {
    this._isChecked = v;
  }

  /**
   * Define the tabindex
   */
  @Input()
  public tabIndex: number = 0;

  /**
   * Define the theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Emit an event on input change
   */
  @Output()
  public inputChange: EventEmitter<boolean> = new EventEmitter;

  /**
   * Emit a change when moving from the indeterminate state
   */
  @Output()
  public indeterminateChange: EventEmitter<MatCheckboxChange> = new EventEmitter;

  /**
   * Provide access to the MatCheckboxComponent
   */
  @ViewChild(MatCheckbox)
  checkbox: MatCheckbox;


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    super();
  }


  /**
   * After the child views are initialized, set the checked value if needed
   */
  ngAfterViewInit() {
    // istanbul ignore else
    if (this._isChecked) {
      this.checkbox.checked = this._isChecked;
      this.changeDetectorRef.detectChanges();
    }
  }

}
