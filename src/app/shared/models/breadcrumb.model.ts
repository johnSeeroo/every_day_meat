import { Params } from '@angular/router';

export interface BreadCrumb {
    label: string;
    params?: Params;
    routeKey?: string;
    url: string;
}
