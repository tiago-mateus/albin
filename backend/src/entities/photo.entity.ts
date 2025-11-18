import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from './album.entity';

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  album_id: string;

  @ManyToOne(() => Album, (album) => album.photos)
  album: Album;

  @Column()
  url_original: string;

  @Column({ nullable: true })
  url_thumb: string;

  @Column({ type: 'int', default: 0 })
  size_kb: number;

  @CreateDateColumn()
  created_at: Date;
}
