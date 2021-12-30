import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BreadCrumb } from '../../models/breadcrumb.model';

@Component({
  selector: 'sxp-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  @Input()
  set BreadCrumb(breadCrumbs_: BreadCrumb[]) {
    this.breadcrumbs = breadCrumbs_;
  }
  get BreadCrumb() {
    return this.breadcrumbs;
  }

  breadcrumbs: BreadCrumb[] = [];

  constructor(private router: Router) {}

  /* Public Methods */
  gotoUrl(breadcrumb: BreadCrumb): void {
    this.router.navigate([breadcrumb.url], {
      queryParams: breadcrumb.params,
    });
  }
}
