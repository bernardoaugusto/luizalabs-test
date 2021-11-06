import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Exclude } from 'class-transformer';
import FavoriteProduct from '../../../../favoriteProducts/infra/typeorm/entities/FavoriteProduct';

@Entity('customers')
class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @OneToMany(() => FavoriteProduct, favoriteProduct => favoriteProduct.customer)
    favoriteProducts?: Array<FavoriteProduct>;
}

export default Customer;
