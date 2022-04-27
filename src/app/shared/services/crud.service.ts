import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { Product } from './../models/product.service';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private dbProductPath = '/products';

  product: AngularFirestoreCollection<Product>;
  products: AngularFirestoreCollection<Product>;

  constructor(private db: AngularFirestore) {
    this.products = db.collection(this.dbProductPath, (ref) =>
      ref.orderBy('name')
    );
    this.product = db.collection(this.dbProductPath);
  }

  // *************************** GETS *****************************

  getAllProducts(): AngularFirestoreCollection<Product> {
    return this.products;
  }

  getProduct(id: string) {
    return this.product.doc(id);
  }

  // *************************** POSTS *****************************

  saveProduct(product: Product): any {
    return this.product.add({ ...product });
  }

  updateProduct(id: string, product: Product): Promise<void> {
    return this.product.doc(id).update(product);
  }

  deleteProduct(id: string): Promise<void> {
    return this.product.doc(id).delete();
  }
}
