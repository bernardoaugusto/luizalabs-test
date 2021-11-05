import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Exclude } from 'class-transformer';

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
}

export default Customer;
