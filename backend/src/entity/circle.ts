import { prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: { collection: 'Circles' }, // 设置集合名称
})
export class Circle {
  @prop()
  public id?: number;

  @prop()
  public name?: string;

  @prop()
  public author_id?: number;

  @prop()
  public description?: string;

  @prop()
  public created_at?: string;

  @prop()
  public updated_at?: string;

  @prop({ type: () => [Number] })
  public users?: number[]; // 储存用户ID的数组

  @prop()
  public imageUrl?: string; // 储存图片的URL
}