import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { IProduct } from 'src/app/shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product?: IProduct;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.shopService.getProduct(+id).subscribe({
        next: (product) => {
          this.product = product;
          this.breadcrumbService.set('@productDetails', product.name);
        },
        error: (error) => console.log(error),
      });
    }
  }
}
