import {Injectable} from '@angular/core';
import {IProduct} from './data.service';

@Injectable({
  providedIn: 'root'
})

export class ProductManager {
  compareProduct: IProduct[] = [];

  constructor() {
    this.compareProduct = [];
    if(this.compareProduct.length <= 0) {
      this.compareProduct = JSON.parse(localStorage.getItem('compareList') || '[]');
    }
  }

  /**
   *  Add product
   */
  addToCompare(product: IProduct) {
    this.compareProduct.push(product);
    localStorage.setItem('compareList', JSON.stringify(this.compareProduct));
  }

  /**
   *  Remove Product
  */
  removeFromCompare(product: IProduct) {
    this.compareProduct = this.compareProduct.filter(item => item.id !== product.id);
    localStorage.setItem('compareList', JSON.stringify(this.compareProduct));
  }

  /**
  * Get all product list that contain in compare list
  */
  getCompareProducts() {
    return this.compareProduct;
  }

  /**
   * Clear compare product list
   */
  clearCompare() {
    this.compareProduct = [];
    return this.compareProduct;
  }

}
