import { auth } from "@clerk/nextjs/server";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

const SubscriptionPlan = () => {

  return (
    <div className="flex px-4 sm:px-0">
      <div className="w-full md:w-1/3 bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y">
        <div className="pt-[15px] px-[25px] pb-[25px]">
          <div className="flex justify-end">
            <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
              <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                Pro
              </p>
            </div>
          </div>

          <div>
            <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
              For Experts
            </p>
            <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                ₹2,000
            </p>
          </div>

          <div>
            <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
              per month
            </p>
          </div>
        </div>

        <div className="pt-[25px] px-[25px] pb-[35px]">
          <div>
            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
              Expert Tag
            </p>
            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
              Post Unlimited Content
            </p>
            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
              Increase Your Reach
            </p>
            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
              Build a global network
            </p>
          </div>

          <div className="mt-[25px]">
            <Button>
                Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
