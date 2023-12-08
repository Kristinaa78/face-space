import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { RoomService } from '../services/room/room.service';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Room } from '../services/room/room';
import { MessageService } from 'primeng/api';

export const RoomResolver: ResolveFn<Observable<Room>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  roomService: RoomService = inject(RoomService),
  messageService: MessageService = inject(MessageService)
) => {
  return roomService.getRoomById(Number(route.queryParams['id'])).pipe(
    catchError((error) => {
      // Handle the error here, log it, or perform any necessary actions
      console.error('Error in resolver:', error);

      // Emit an error so that the route navigation fails
      messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.error,
      });

      return throwError('Error occurred while fetching data');
    })
  );
};
