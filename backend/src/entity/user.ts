import { prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: { collection: 'Users' }  // 设置集合名称
})
export class User {
    @prop()
    public id?: number;

    @prop()
    public phone?: string;

    @prop()
    public password?: string;
}