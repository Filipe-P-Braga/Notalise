import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-e-stand',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './e-stand.html',
    styleUrl: './e-stand.css',
})
export class EStand {
    standData = {
        name: 'Smart City UVV',
        subtitle: 'Inovação urbana',
        local: 'Ciência da Computação',
        description: 'Projeto inovador voltado para o desenvolvimento de soluções inteligentes para cidades do futuro.',
        image: 'tamanduA.webp'
    };

    saveChanges() {
        console.log('Dados salvos:', this.standData);
        alert('Alterações salvas com sucesso!');
    }
}
