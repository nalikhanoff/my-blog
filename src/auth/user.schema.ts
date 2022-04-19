import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    transform(_, ret) {
      ret.id = ret._id;
      ['_id', 'password'].forEach((k) => delete ret[k]);
    },
    versionKey: false,
    virtuals: true,
  },
})
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

const userSchema = SchemaFactory.createForClass(User);

userSchema.virtual('id').get(function (this: UserDocument) {
  return this._id.toHexString();
});

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = bcrypt.hashSync(this.get('password'), 10);
    this.set('password', hashedPassword);
  }
  done();
});

export { userSchema };
