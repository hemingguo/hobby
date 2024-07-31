import { prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: { collection: 'Users' }  // 设置集合名称
})
export class User {
    @prop()
    public id?: number;

    @prop()
    public username?: string;

    @prop()
    public image?: string;

    @prop()
    public state?: string;

    @prop()
    public phone?: string;

    @prop()
    public password?: string;

    @prop()
    public post_count?: number;

    @prop()
    public like_count?: number;

    @prop()
    public created_at?: string;
}