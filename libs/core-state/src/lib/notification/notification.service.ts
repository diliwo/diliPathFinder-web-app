import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, concat } from 'rxjs';
import { NotificationMessage } from '@frontend/api-interface';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { MessageType } from '@frontend/api-interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ProblemDetails } from 'libs/core-data/src/lib/services/share';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _messages: BehaviorSubject<NotificationMessage> = new BehaviorSubject<
    NotificationMessage
  >({ Type: '', Text: '' });
  public readonly messages: Observable<
    NotificationMessage
  > = this._messages.asObservable();

  constructor(private snackBarService: MatSnackBar) { }

  emitMessage(messageToEmit: NotificationMessage) {
    if (
      messageToEmit !== undefined &&
      messageToEmit.Text !== undefined &&
      messageToEmit.Text.length > 0
    ) {
      this._messages.next(messageToEmit);
    }
  }
  private getClassFromMessageType(type: MessageType) {
    switch (type) {
      case MessageType.Error:
        return 'notification-error';
      case MessageType.Warning:
        return 'notification-warning';
      case MessageType.Success:
        return 'notification-success';
      default:
        return 'notification-info';
    }
  }
  showMessage(
    message: string,
    type: MessageType,
    actionButton = 'Fermer',
    duration = 5000,
    horizontalPosition: MatSnackBarHorizontalPosition = 'right',
    verticalPosition: MatSnackBarVerticalPosition = 'bottom'
  ) {
    this.snackBarService.open(message, actionButton, {
      duration,
      horizontalPosition,
      verticalPosition,
      panelClass: this.getClassFromMessageType(type)
    });
  }

  showServerErrorNotification(
    error: ProblemDetails,
    resourseName: string = null
  ) {
    //console.error(error);
    const delay = 15000;
    switch (error.status) {
      case 401:
        this.showMessage(
          'une erreur s\'est produite lors de l\'authentification',
          MessageType.Error,
          'Fermer',
          delay
        );
        break;
      case 400:
        this.showMessage(
          error.detail,
          MessageType.Error,
          'Fermer',
          delay
        );
        break;
      case 404:
        this.showMessage(
          'La ressource n\'a pas été trouvée',
          MessageType.Error,
          'Fermer',
          delay
        );
        break;
      default:
        this.showMessage(
          'Un problème inconnu s\'est produit sur le serveur. Si l\'erreur persiste, consultez votre administrateur système',
          MessageType.Error,
          'Fermer',
          delay
        );
    }
  }
}
