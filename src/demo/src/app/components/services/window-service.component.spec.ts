import { TestBed, async } from '@angular/core/testing';

import { TsWindowService } from '@terminus/ui';
import { TsWindowServiceMock } from '@terminus/ui/testing/mocks/window.service.mock';
import { WindowServiceComponent } from './window-service.component';


describe('WindowServiceComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TsWindowService,
          useClass: TsWindowServiceMock,
        },
      ],
      declarations: [
        WindowServiceComponent,
      ],
    }).compileComponents();
  }));


  it(`should call the mock window service`, () => {
    const fixture = TestBed.createComponent(WindowServiceComponent);
    const component = fixture.debugElement.componentInstance;

    expect(component.windowService.nativeWindow.location.href).toEqual('foo/bar');
  });

});
