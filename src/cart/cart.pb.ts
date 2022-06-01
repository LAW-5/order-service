/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export const protobufPackage = 'cart';

export interface CreateCartRequest {
  userId: number;
  merchantId: number;
  productId: number;
  quantity: number;
}

export interface CreateCartResponse {
  status: number;
  error: string[];
}

export interface ListCartRequest {
  userId: number;
}

export interface Cart {
  id: number;
  merchantId: number;
  productId: number;
  quantity: number;
}

export interface Carts {
  cart: Cart[];
}

export interface ListCartResponse {
  data: { [key: number]: Carts };
  status: number;
  error: string[];
}

export interface ListCartResponse_DataEntry {
  key: number;
  value: Carts | undefined;
}

export interface EditCartRequest {
  id: number;
  quantity: number;
}

export interface EditCartResponse {
  status: number;
  error: string[];
}

export interface DeleteCartRequest {
  id: number;
}

export interface DeleteCartResponse {
  status: number;
  error: string[];
}

export const CART_PACKAGE_NAME = 'cart';

export interface CartServiceClient {
  createCart(request: CreateCartRequest): Observable<CreateCartResponse>;

  listCart(request: ListCartRequest): Observable<ListCartResponse>;

  editCart(request: EditCartRequest): Observable<EditCartResponse>;

  deleteCart(request: DeleteCartRequest): Observable<DeleteCartResponse>;
}

export interface CartServiceController {
  createCart(
    request: CreateCartRequest,
  ):
    | Promise<CreateCartResponse>
    | Observable<CreateCartResponse>
    | CreateCartResponse;

  listCart(
    request: ListCartRequest,
  ):
    | Promise<ListCartResponse>
    | Observable<ListCartResponse>
    | ListCartResponse;

  editCart(
    request: EditCartRequest,
  ):
    | Promise<EditCartResponse>
    | Observable<EditCartResponse>
    | EditCartResponse;

  deleteCart(
    request: DeleteCartRequest,
  ):
    | Promise<DeleteCartResponse>
    | Observable<DeleteCartResponse>
    | DeleteCartResponse;
}

export function CartServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createCart',
      'listCart',
      'editCart',
      'deleteCart',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('CartService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('CartService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const CART_SERVICE_NAME = 'CartService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
