import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import RealEstate from "./real_estate.entity";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 45, type: "varchar" })
  street: string;

  @Column({ length: 45, type: "varchar" })
  zipCode: string;

  @Column({ length: 7, nullable: true, type: "varchar" })
  number: string | null | undefined;

  @Column({ length: 20 })
  city: string;

  @Column({ length: 2, type: "varchar" })
  state: string;

  @OneToOne(() => RealEstate)
  realEstate: RealEstate;
}

export default Address;
