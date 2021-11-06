import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import Customer from '../../../../customers/infra/typeorm/entities/Customer';

@Entity('favoriteProducts')
class FavoriteProduct {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    customerId: string;

    @Column()
    productId: string;

    @ManyToOne(() => Customer, customer => customer.favoriteProducts)
    @JoinColumn({ name: 'customerId' })
    customer: Customer;
}

export default FavoriteProduct;
