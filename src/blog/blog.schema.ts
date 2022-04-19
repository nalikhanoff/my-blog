import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { User } from 'src/auth/user.schema';

export type BlogDocument = Blog & Document;

@Schema({
  toJSON: {
    transform(_, ret) {
      ret.id = ret._id;
      delete ret['_id'];
    },
    versionKey: false,
  },
  timestamps: true,
})
export class Blog {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: User.name })
  author: Types.ObjectId;
}

export const blogSchema = SchemaFactory.createForClass(Blog);
