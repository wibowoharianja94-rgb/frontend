import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../../shared/services/api'; // pastikan path sesuai

interface Catalog {
  id: number;
  title: string;
  catatan: string;
  tanggal: string; // pakai string karena berasal dari input datetime-local
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  catalogs: Catalog[] = [];
  newTitle = '';
  newCatatan = '';
  newTanggal = '';

  constructor(private api: Api) {}

  ngOnInit(): void {
    this.loadCatalogs();
  }

  // 🔹 Ambil semua data katalog
  loadCatalogs(): void {
    this.api.getCatalog({}).subscribe({
      next: (res: any) => {
        if (res.message === 'Success') {
          this.catalogs = res.val;
        } else {
          this.catalogs = [];
        }
      },
      error: (err) => {
        console.error('Error loading catalogs:', err);
      },
    });
  }

  // 🔹 Tambah catatan baru
  addCatalog(): void {
    const title = this.newTitle.trim();
    const catatan = this.newCatatan.trim();
    const tanggal = this.newTanggal;

    if (!title || !catatan || !tanggal)
      return alert('Judul, catatan, dan tanggal wajib diisi!');

    this.api.addCatalog({ title, catatan, tanggal }).subscribe({
      next: (res: any) => {
        if (res.message === 'Success') {
          this.newTitle = '';
          this.newCatatan = '';
          this.newTanggal = '';
          this.loadCatalogs();
        }
      },
      error: (err) => {
        console.error('Error adding catalog:', err);
        alert('Gagal menambahkan catatan!');
      },
    });
  }

  // 🔹 Edit catatan
  editCatalog(catalog: Catalog): void {
    const newTitle = prompt('Edit judul:', catalog.title);
    const newCatatan = prompt('Edit catatan:', catalog.catatan);
    const newTanggal = prompt('Edit tanggal (YYYY-MM-DD HH:mm:ss):', catalog.tanggal);

    if (!newTitle || !newCatatan || !newTanggal) return;

    this.api
      .editCatalog({
        id: catalog.id,
        title: newTitle.trim(),
        catatan: newCatatan.trim(),
        tanggal: newTanggal,
      })
      .subscribe({
        next: (res: any) => {
          if (res.message === 'Success') {
            this.loadCatalogs();
          }
        },
        error: (err) => {
          console.error('Error editing catalog:', err);
          alert('Gagal mengubah catatan!');
        },
      });
  }

  // 🔹 Hapus catatan
  deleteCatalog(catalog: Catalog): void {
    if (!confirm(`Hapus catatan "${catalog.title}"?`)) return;

    this.api.deleteCatalog({ id: catalog.id }).subscribe({
      next: (res: any) => {
        if (res.message === 'Success' || res.message === 'Todo deleted') {
          this.loadCatalogs();
        }
      },
      error: (err) => {
        console.error('Error deleting catalog:', err);
        alert('Gagal menghapus catatan!');
      },
    });
  }
}
