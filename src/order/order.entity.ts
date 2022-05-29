import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'int' })
  public userId: number;

  @Column({ type: 'int' })
  public merchantId: number;

  @Column({ type: 'int' })
  public productId: number;

  @Column({ type: 'int' })
  public quantity: number;

  @Column({ type: 'varchar' })
  public orderStatus: string;

  @Column({ type: 'varchar' })
  public address: string;

  @Column({ type: 'int', default: 0 })
  public promoId: number[];
}
