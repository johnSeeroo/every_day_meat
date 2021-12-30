import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { ConfirmModalData } from '../../models/confirm-modal-data.model';

@Injectable()
export class ModalService {

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet
  ) { }

  /* Public Methods */
  setDialogConfig(disableClose: boolean, autoFocus: boolean, width: string, data: any = null, panelClass: string = ''): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = disableClose;
    dialogConfig.autoFocus = autoFocus;
    dialogConfig.width = width;
    dialogConfig.data = data;
    dialogConfig.panelClass = panelClass;
    return dialogConfig;
  }

  private cnfirmModalData: ConfirmModalData;

  confirm(data: ConfirmModalData): any {
    const dialogConfig = this.setDialogConfig(true, false, 'auto', data);
    dialogConfig.panelClass = 'confirm';
    return this.dialog.open(ConfirmModalComponent, dialogConfig).afterClosed();
  }

  /*
  * message: message to be displayed
  * action: label of button
  */
  showNotification(message: string, action: string = 'OK', duration: number = 4000): void {
    this.snackBar.open(message, action, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration,
    });
  }


}
