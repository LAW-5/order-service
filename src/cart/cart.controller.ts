import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateCartDto,
  ListCartDto,
  EditCartDto,
  DeleteCartDto,
} from './cart.dto';
import {
  CreateCartResponse,
  ListCartResponse,
  EditCartResponse,
  DeleteCartResponse,
  CART_SERVICE_NAME,
} from './cart.pb';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  @Inject(CartService)
  private readonly service: CartService;

  @GrpcMethod(CART_SERVICE_NAME, 'CreateCart')
  private createCart(payload: CreateCartDto): Promise<CreateCartResponse> {
    return this.service.createCart(payload);
  }

  @GrpcMethod(CART_SERVICE_NAME, 'ListCart')
  private listCart(payload: ListCartDto): Promise<ListCartResponse> {
    return this.service.listCart(payload);
  }

  @GrpcMethod(CART_SERVICE_NAME, 'EditCart')
  private editCart(payload: EditCartDto): Promise<EditCartResponse> {
    return this.service.editCart(payload);
  }

  @GrpcMethod(CART_SERVICE_NAME, 'DeleteCart')
  private deleteCart(payload: DeleteCartDto): Promise<DeleteCartResponse> {
    return this.service.deleteCart(payload);
  }
}
