export type GenerativeElement =
  | { type: "intent"; intent: string }
  | { type: "why"; ingredient: string; explanation: string }
  | { type: "tradeoff"; ingredient: string; reasoning: string }
  | { type: "uncertainty"; topic: string }
  | { type: "benign"; ingredient: string; reassurance: string }
  | { type: "action"; advice: string };


export type UserSettings = {
  dietaryPreferences?: string[];
  allergies?: string[];
  tone: string,
  uncertainty: string,
  takeaway: string,  
}