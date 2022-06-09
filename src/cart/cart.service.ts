import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import {
  CreateCartDto,
  ListCartDto,
  EditCartDto,
  DeleteCartDto,
} from './cart.dto';
import { Cart } from './cart.entity';
import {
  CreateCartResponse,
  ListCartResponse,
  EditCartResponse,
  DeleteCartResponse,
} from './cart.pb';

@Injectable()
export class CartService {
  @InjectRepository(Cart)
  private readonly repository: Repository<Cart>;

  @Inject(WINSTON_MODULE_PROVIDER)
  private readonly logger: Logger;

  public async createCart({
    userId,
    merchantId,
    productId,
    quantity,
  }: CreateCartDto): Promise<CreateCartResponse> {
    let cart = new Cart();
    cart.userId = userId;
    cart.merchantId = merchantId;
    cart.productId = productId;
    cart.quantity = quantity;

    await this.repository.save(cart);

    this.logger.log('info', `create new cart for user id: ${userId}`);

    return { status: HttpStatus.OK, error: null };
  }

  public async listCart({ userId }: ListCartDto): Promise<ListCartResponse> {
    const carts: Cart[] = await this.repository.find({
      where: { userId: userId },
    });

    let response: ListCartResponse = {
      data: {},
      status: HttpStatus.OK,
      error: null,
    };

    carts.forEach((x: Cart) => {
      if (!Object.keys(response.data).includes(x.merchantId.toString())) {
        response.data[x.merchantId] = { cart: [] };
      }
      response.data[x.merchantId].cart.push(x);
    });

    this.logger.log(
      'info',
      `listing all cart for user id: ${userId} with a total of ${carts.length} row`,
    );

    return response;
  }

  public async editCart({
    id,
    quantity,
  }: EditCartDto): Promise<EditCartResponse> {
    let cart: Cart = await this.repository.findOne({ where: { id: id } });

    if (!cart) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['No cart data with given id'],
      };
    }

    cart.quantity = quantity;
    await this.repository.save(cart);

    this.logger.log('info', `editing cart with id ${id}`);

    return { status: HttpStatus.OK, error: null };
  }

  public async deleteCart({ id }: DeleteCartDto): Promise<DeleteCartResponse> {
    let cart: Cart = await this.repository.findOne({ where: { id: id } });

    if (!cart) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['No cart data with given id'],
      };
    }

    await this.repository.delete(cart);

    this.logger.log('info', `deleting cart with id ${id}`);

    return { status: HttpStatus.OK, error: null };
  }
}
