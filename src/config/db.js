import mongoose from 'mongoose';
import { devConfig } from './env';
mongoose.Promise = global.Promise;
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
export const connect = () => mongoose.connect(devConfig.DATABASE_LOCATION);
