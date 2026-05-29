import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterModule
} from '@angular/router';

import {
  Subject,
  EMPTY
} from 'rxjs';

import {
  switchMap,
  takeUntil
} from 'rxjs/operators';

import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-edition-event',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './edition-event.html',
  styleUrl: './edition-event.css',
})

export class EditionEvent
  implements OnInit, OnDestroy {

  private destroy$ =
    new Subject<void>();

  eventForm: FormGroup;

  eventId!: number;

  originalEvent: any = null;

  isSubmitted = false;

  isSuccess = false;

  isLoading = true;

  constructor(

    private fb: FormBuilder,

    private route: ActivatedRoute,

    private router: Router,

    private eventService: EventService,

    private cdr: ChangeDetectorRef

  ) {

    this.eventForm = this.fb.group({

      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      date: [
        '',
        Validators.required
      ],

      local: [
        '',
        Validators.required
      ],

      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10)
        ]
      ]

    });

  }

  ngOnInit(): void {

    console.log(
      'Tela de edição iniciada'
    );

    this.route.paramMap.pipe(

      switchMap(params => {

        const id = params.get('id');

        console.log(
          'Novo ID detectado:',
          id
        );

        if (!id) {

          console.error(
            'ID inválido'
          );

          this.router.navigate([
            '/eventos'
          ]);

          return EMPTY;
        }

        this.eventId = Number(id);

        this.isLoading = true;

        // IMPORTANTE
        // limpa formulário antigo

        this.eventForm.reset();

        this.originalEvent = null;

        return this.eventService
          .getEventById(this.eventId);

      }),

      takeUntil(this.destroy$)

    ).subscribe({

      next: (event) => {

        console.log(
          'Evento carregado:',
          event
        );

        this.originalEvent = event;

        this.eventForm.patchValue({

          title:
            event.name || '',

          date:
            event.date || '',

          local:
            event.address || '',

          description:
            event.description || ''

        });

        this.isLoading = false;

        // força atualização da view

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error(
          'Erro ao carregar evento:',
          err
        );

        this.isLoading = false;

        this.router.navigate([
          '/eventos'
        ]);

      }

    });

  }

  saveChanges() {

    this.isSubmitted = true;

    if (
      this.eventForm.invalid ||
      !this.originalEvent
    ) return;

    const updatedEvent = {

      ...this.originalEvent,

      name:
        this.eventForm.value.title,

      address:
        this.eventForm.value.local,

      description:
        this.eventForm.value.description

    };

    this.eventService
      .updateEvent(updatedEvent)

      .pipe(
        takeUntil(this.destroy$)
      )

      .subscribe({

        next: (response) => {

          console.log(
            'Evento atualizado:',
            response
          );

          this.isSuccess = true;

          setTimeout(() => {

            this.router.navigate([
              '/evento',
              this.eventId
            ]);

          }, 1000);

        },

        error: (err) => {

          console.error(
            'Erro ao atualizar:',
            err
          );

        }

      });

  }

  ngOnDestroy(): void {

    this.destroy$.next();

    this.destroy$.complete();

  }

}