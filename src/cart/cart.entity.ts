import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cart extends BaseEntity {
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
}
