import { Component, OnInit } from '@angular/core';
import { ProductManager } from '../../services/product-manager';

@Component({
  selector: 'app-product-compare',
  templateUrl: './product-compare.component.html',
  styleUrls: ['./product-compare.component.scss']
})
export class ProductCompareComponent implements OnInit {

  products:any;

  constructor(private productManager : ProductManager) { }

  ngOnInit(): void {
    /* Get products for compare */
    this.products = this.productManager.getCompareProducts();
  }

}
