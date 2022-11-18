import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ProductManager } from '../../services/product-manager';
import { DataService, IProduct } from '../../services/data.service';

type pType = {
  id: Boolean;
  model: string;
  ram: string;
  hdd: string;
  location: string;
  price: string;
};

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  /* Declare variables to use in template */
  allProducts: IProduct[] = [];
  products:any;
  filteredValues = { location : '', ram : [], hdd : '', storage : '' };
  locationList : any[] = [];
  filterForm: FormGroup;
  compareProduct : any;
  errorMessage:any;

  constructor(private formBuilder: FormBuilder, private productManager : ProductManager, private dataService:DataService) {
    this.filterForm =  this.formBuilder.group({
      ramFilter : this.formBuilder.array([]),
      locationFilter : [],
      hddFilter : [],
      storageFilter: []
    });
  }

  ngOnInit(): void {

    /* Fetching data from api */
    this.dataService.getProducts().subscribe(products => {
        this.allProducts = products;
        this.products = this.allProducts;

        /* Getting location list for filter */
        this.allProducts.forEach((record) => {
          if (this.locationList.indexOf(record.location) === -1) {
            this.locationList.push(record.location);
          }
        });
      },error => this.errorMessage = <any>error);


    /* Check filter form data for HDD change and fire filter*/
    this.filterForm.controls['hddFilter'].valueChanges.subscribe((hddFilterValue) => {
      this.filteredValues.hdd = hddFilterValue;
      this.filterValues();
    });

    /* Check filter form data for location change and fire filter*/
    this.filterForm.controls['locationFilter'].valueChanges.subscribe((locationFilterValue) => {
      this.filteredValues.location = locationFilterValue;
      this.filterValues();
    });

    /* Check filter form data for RAM change and fire filter*/
    this.filterForm.controls['ramFilter'].valueChanges.subscribe((ramFilterValue) => {
      this.filteredValues.ram = ramFilterValue;
      this.filterValues();
    });

    this.compareProduct = this.productManager.getCompareProducts();
  }

  /** Add product for compare */
  addProductToCompare(e:any, product: IProduct) {
    if (e.target.checked) {
      /* Add product to compare list */
      if(this.compareProduct.length < 5) {
        this.productManager.addToCompare(product);
      }
    } else {
      /* remove product from compare list */
      this.productManager.removeFromCompare(product);
    }
    this.compareProduct = this.productManager.getCompareProducts();
  }

  /** Filter product data */
  filterValues() {
    /* Reset product list */
    this.products = this.allProducts;

    /* Apply filter on product list */
    if (this.filteredValues.hdd != '') {
      this.products = this.products.filter( (p: any) => p.hdd.toLowerCase().includes(this.filteredValues.hdd.toLowerCase()));
    }
    if (this.filteredValues.location != '') {
      this.products = this.products.filter( (p: any) => p.location.toLowerCase() === this.filteredValues.location.toLowerCase());
    }
    if (this.filteredValues.ram.length) {
      this.products = (<pType[]>this.products).filter((cItem: pType) => (this.filteredValues.ram as string[]).some(item => {
        /* Create inject some string in filter to get accurate filter because data is not proper */
        let itemDDR2 = item+'DDR2';
        let itemDDR3 = item+'DDR3';
        let itemDDR4 = item+'DDR4';
        return (cItem.ram.toLowerCase() === (itemDDR2.toLowerCase()) || cItem.ram.toLowerCase() === (itemDDR3.toLowerCase()) || cItem.ram.toLowerCase() === (itemDDR4.toLowerCase()));
        //return (cItem.ram.toLowerCase().includes(itemDDR2.toLowerCase()) || cItem.ram.toLowerCase().includes(itemDDR3.toLowerCase()) || cItem.ram.toLowerCase().includes(itemDDR4.toLowerCase()));
      }));
    }
  }

  /** Detect change for ram filter and assign value  */
  onRamCheckboxChange(e: any) {
    const checkArray: FormArray = this.filterForm.get('ramFilter') as FormArray;
    if (e.target.checked) {
      /* Add value to array if checkbox checked */
      checkArray.push(new FormControl(e.target.value));
    } else {
      /* Find and remove value from array if checkbox not checked */
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
