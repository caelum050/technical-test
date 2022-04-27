import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/shared/services/config.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './new-product.component.html',
})
export class NewProductFormComponent implements OnInit {
  public isEditing: boolean = false;
  public currentProductId?: string;
  public isLoading: boolean = false;

  public product = {
    name: '',
    category: '',
    description: '',
    price: 0,
    quantity: 0,
    stock: false,
    imageUrl: '',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public restApi: ConfigService
  ) {
    let productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.isEditing = true;
      this.currentProductId = productId;
      this.getProduct(productId);
      // this.getProduct(productId);
    }
  }

  ngOnInit(): void {}

  getProduct(productId: string) {
    this.isLoading = true;
    this.restApi.getProduct(productId).subscribe((data: any) => {
      this.product = {
        name: data.name,
        category: data.category,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
        stock: data.stock,
        imageUrl: data.imageUrl,
      };
      this.isLoading = false;
    });
  }

  save(product: any) {
    this.isLoading = true;
    if (product.quantity <= 0) {
      product.quantity == 0;
      product.stock = false;
    }

    if (this.isEditing) {
      this.restApi
        .updateProduct(this.currentProductId!.toString(), product)
        .subscribe((data) => {
          this.router.navigate(['/dashboard']);
        });
    } else {
      this.restApi.createProduct(product).subscribe((data: {}) => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
