import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'int' })
  public userId: number;

  @Column({ type: 'int' })
  public merchantId: number;

  @Column({ type: 'int', array:true })
  public productId: number[];

  @Column({ type: 'int', array:true })
  public quantity: number[];

  @Column({ type: 'int' })
  public totalPrice: number;
  
  @Column({ type: 'varchar' })
  public name: string;
  
  @Column({ type: 'varchar' })
  public address: string;

  @Column({ type: 'varchar' })
  public orderStatus: string;
}
