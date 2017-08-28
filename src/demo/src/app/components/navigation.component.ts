import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/pairs';
import 'rxjs/add/observable/from';

import { TsNavigationItem } from '@terminus/ui';

const NAV_ITEMS_MOCK: TsNavigationItem[] = [
  {
    name: 'Components',
    action: 'navigate',
    destination: ['/components'],
    onlyHidden: false,
    isDisabled: true,
  },
  {
    name: 'Buttons',
    action: 'navigate',
    destination: ['/components/button'],
    onlyHidden: false,
  },
  {
    name: 'Menus',
    action: 'navigate',
    destination: ['/components/menu'],
    onlyHidden: false,
  },
  {
    name: 'Fake Link',
    action: 'navigate',
    destination: ['/creatives'],
    onlyHidden: false,
  },
  {
    name: 'Fake Link',
    action: 'navigate',
    destination: ['/settings'],
    onlyHidden: false,
  },
  {
    name: 'External',
    action: 'navigate',
    destination: 'https://google.com',
    onlyHidden: false,
  },
  {
    name: 'Action: Log Out',
    action: 'log-out',
    onlyHidden: false,
  },
  {
    name: 'Fake Link',
    action: 'navigate',
    destination: ['/admin'],
    onlyHidden: true,
  },
  {
    name: 'Action: Log In As',
    action: 'log-in-as',
    onlyHidden: true,
  },
];


@Component({
  selector: 'demo-navigation',
  styleUrls: ['./navigation.component.scss'],
  template: `
    <div class="outer" fxLayout="row" fxLayoutAlign="space-between stretch">
      <div fxLayout="row" fxLayoutAlign="center center" fxFlex="none">
        <span>
          Logo
        </span>
      </div>

      <ts-navigation
        fxFlex="1 1 auto" class="inner"
        [items]="navigationItems$ | async"
        [user]="currentUser$ | async"
        [welcomeMessage]="myMessage"
        (itemSelected)="triggerAction($event)"
      ></ts-navigation>
    </div>
  `,
})
export class NavigationComponent implements OnInit {
  public currentUser$: Observable<any> = Observable.from([{
    id: 1,
    email: 'max@roadwarrior.com',
    firstname: 'Max',
    lastname: 'Rockatansky',
    fullName: 'Max Rockatansky',
  }]);
  public navigationItems$: Observable<any> = Observable.from([NAV_ITEMS_MOCK]);
  public myMessage = 'Hello dear,';


  ngOnInit(): void {
    /*
     *this.currentUser$.subscribe((v: any) => {
     *  console.log('currentUser$: ', v);
     *})
     */
  }


  /**
   * Trigger the action defined for the navigation item
   *
   * @param {Object} item The navigation item
   */
  triggerAction(item: TsNavigationItem): void {
    console.log('triggerAction: ', item);

/*
 *    // Navigate
 *    if (item.action === 'navigate' && item.destination) {
 *      console.log('should navigate; destination: ', item.destination);
 *
 *      if (typeof item.destination !== 'string') {
 *        this.router.navigate(item.destination);
 *      } else {
 *        this.windowService.nativeWindow.open(item.destination, '_blank');
 *      }
 *
 *    } else if (item.action === 'log-out') {
 *      // Log Out
 *      console.log('should log out');
 *    } else if (item.action === 'log-in-as') {
 *      console.log('trigger log in as user');
 *    }
 */
  }
}
