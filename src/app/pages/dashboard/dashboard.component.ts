import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../shared/services/crud.service';
import { Product } from './../../shared/models/product.service';

import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/shared/services/config.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class ProductsComponent implements OnInit {
  products?: any = [];
  filteredProducts?: any = [];

  isLoading: boolean = false;

  displayedColumns: string[] = [
    'name',
    'category',
    'price',
    'quantity',
    'stock',
    'actions',
  ];

  constructor(
    private crudService: CrudService,
    route: ActivatedRoute,
    public restApi: ConfigService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    // this.retrieveProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.restApi.getProducts().subscribe((data: {}) => {
      this.products = data;
      this.filteredProducts = data;
      this.isLoading = false;
    });
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products!.filter(
          (prod: { name: string; id: string }) =>
            prod.name.toLowerCase().includes(query.toLowerCase()) ||
            prod.id.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  deleteProduct(productId: string) {
    this.restApi.deleteProduct(productId).subscribe((data) => {
      this.loadProducts();
    });
  }

  // FIREBASE

  // retrieveProducts(): void {
  //   this.isLoading = true;
  //   this.crudService
  //     .getAllProducts()
  //     .snapshotChanges()
  //     .pipe(
  //       map((changes: any[]) =>
  //         changes.map((c) => ({
  //           id: c.payload.doc.id,
  //           ...c.payload.doc.data(),
  //         }))
  //       )
  //     )
  //     .subscribe((data) => {
  //       this.products = data;
  //       this.filteredProducts = data;
  //       this.isLoading = false;
  //     });
  // }

  // deleteProduct(productId: string) {
  //   if (productId) {
  //     this.crudService
  //       .deleteProduct(productId)
  //       .then(() => {
  //         window.location.reload();
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }
}
