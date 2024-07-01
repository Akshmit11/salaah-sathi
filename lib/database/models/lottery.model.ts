import { Schema, Document, model, models } from "mongoose";
import { IUser } from "./user.model";

export interface ILottery extends Document {
  date: Date;
  eligibleUsers: IUser[];
  todayPrizeMoney: number;
  totalPrizeDistributed: number;
  pastWinners: {
    winners: IUser[];
    dateWon: Date;
    amountDistributedThatDay: number;
  }[];
}

const LotterySchema: Schema<ILottery> = new Schema({
  date: { type: Date, required: true },
  eligibleUsers: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  todayPrizeMoney: { type: Number, default: 0 },
  totalPrizeDistributed: { type: Number, default: 0 },
  pastWinners: [
    {
      winners: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
      dateWon: { type: Date, required: true },
      amountDistributedThatDay: { type: Number, required: true },
    },
  ],
});

const Lottery = models?.Lottery || model('Lottery', LotterySchema);

export default Lottery;
