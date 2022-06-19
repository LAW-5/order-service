/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export const protobufPackage = 'order';

export interface CreateOrderRequest {
  userId: number;
  merchantId: number;
  productId: number[];
  quantity: number[];
  totalPrice: number;
  name: string;
  address: string;
  orderStatus: string;
}

export interface CreateOrderResponse {
  status: number;
  error: string[];
}

export interface ListOrderRequest {
  userId: number;
}

export interface ListMerchantOrderRequest {
  merchantId: number;
}

export interface Order {
  id: number;
  orderStatus: string;
  productId: number[];
  quantity: number[];
  totalPrice: number;
  name: string;
  address: string;
}

export interface ListOrderResponse {
  data: Order[];
  status: number;
  error: string[];
}

export interface ListMerchantOrderResponse {
  data: Order[];
  status: number;
  error: string[];
}

export interface EditOrderRequest {
  id: number;
  orderStatus: string;
}

export interface EditOrderResponse {
  status: number;
  error: string[];
}

export const ORDER_PACKAGE_NAME = 'order';

export interface OrderServiceClient {
  createOrder(request: CreateOrderRequest): Observable<CreateOrderResponse>;

  listOrder(request: ListOrderRequest): Observable<ListOrderResponse>;

  listMerchantOrder(
    request: ListMerchantOrderRequest,
  ): Observable<ListMerchantOrderResponse>;

  editOrder(request: EditOrderRequest): Observable<EditOrderResponse>;
}

export interface OrderServiceController {
  createOrder(
    request: CreateOrderRequest,
  ):
    | Promise<CreateOrderResponse>
    | Observable<CreateOrderResponse>
    | CreateOrderResponse;

  listOrder(
    request: ListOrderRequest,
  ):
    | Promise<ListOrderResponse>
    | Observable<ListOrderResponse>
    | ListOrderResponse;

  listMerchantOrder(
    request: ListMerchantOrderRequest,
  ):
    | Promise<ListMerchantOrderResponse>
    | Observable<ListMerchantOrderResponse>
    | ListMerchantOrderResponse;

  editOrder(
    request: EditOrderRequest,
  ):
    | Promise<EditOrderResponse>
    | Observable<EditOrderResponse>
    | EditOrderResponse;
}

export function OrderServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createOrder',
      'listOrder',
      'listMerchantOrder',
      'editOrder',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('OrderService', method)(
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
      GrpcStreamMethod('OrderService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const ORDER_SERVICE_NAME = 'OrderService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
