import { plans } from "@/data/plans";

export const getPlanAmount = (planTitle: string, duration: 90 | 180): number => {
    const plan = plans.find(p => p.title === planTitle);
    if (!plan) throw new Error('Invalid plan selected');
    
    const priceStr = duration === 90 ? plan.price90 : plan.price180;
    return parseInt(priceStr.replace('₹', ''));
  };
  