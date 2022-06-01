import { IsNumber, IsString } from 'class-validator';
import {
  CreateCartRequest,
  ListCartRequest,
  EditCartRequest,
  DeleteCartRequest,
} from './cart.pb';

export class CreateCartDto implements CreateCartRequest {
  @IsNumber()
  public readonly userId: number;

  @IsNumber()
  public readonly merchantId: number;

  @IsNumber()
  public readonly productId: number;

  @IsNumber()
  public readonly quantity: number;
}

export class ListCartDto implements ListCartRequest {
  @IsNumber()
  public readonly userId: number;
}

export class EditCartDto implements EditCartRequest {
  @IsNumber()
  public readonly id: number;
  
  @IsString()
  public readonly quantity: number;
}

export class DeleteCartDto implements DeleteCartRequest {
  @IsNumber()
  public readonly id: number;
}
