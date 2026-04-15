// components/admin/adminData.ts

export type SignupType = "enrolled" | "waitlist" | "help";
export type ProgStatus = "open" | "soon";

export interface Signup {
  id: number; name: string; phone: string; state: string;
  programme: string; type: SignupType; message: string;
  date: string; selected: boolean;
}

export interface Facilitator {
  id: number; name: string; phone: string; email: string;
  school: string; state: string; role: string;
  studentsReg: number; status: string;
}

export interface Programme {
  id: number; name: string; desc: string; track: string;
  status: ProgStatus; cta: string; count: number;
}

export interface Message {
  dir: "in" | "out"; text: string; time: string;
}

export interface Conversation {
  id: number; name: string; phone: string;
  unread: boolean; messages: Message[];
}

export const AVATAR_BG = ["#E6F7F5","#EFF4FF","#FFF3E6","#F3F0FF","#E6F7EF"];
export const AVATAR_FG = ["#009E8E","#2563EB","#D97706","#7C3AED","#00A870"];

function rnd(a: number, b: number) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function randName() {
  const f = ["Fatima","Emeka","Aisha","Chidi","Blessing","Ibrahim","Ngozi","Usman","Chiamaka","Aminu","Sade","Yusuf","Nkechi","Adaeze","Musa"];
  const l = ["Usman","Okafor","Ibrahim","Adeyemi","Bello","Eze","Mohammed","Okonkwo","Abubakar","Nwosu"];
  return f[rnd(0,f.length-1)] + " " + l[rnd(0,l.length-1)];
}
function randPhone() { return "0" + [7,8,9][rnd(0,2)] + "" + rnd(0,1) + "" + rnd(10000000,99999999); }
function randDate() {
  const d = new Date(2025,2,1); d.setDate(d.getDate() + rnd(0,41));
  return d.toLocaleDateString("en-NG",{day:"2-digit",month:"short",year:"2-digit"});
}

export const PROG_NAMES = ["JAMB / WAEC Resit","Pathway Programme","Qampus Programme","Founders Academy","Q-Lamp","Qloud Box"];

export const NIGERIA_STATES = [
  {s:"Abuja FCT",n:38},{s:"Lagos",n:22},{s:"Rivers",n:14},{s:"Kano",n:11},{s:"Taraba",n:9},
  {s:"Kaduna",n:8},{s:"Anambra",n:7},{s:"Oyo",n:6},{s:"Borno",n:5},{s:"Delta",n:5},
  {s:"Enugu",n:4},{s:"Osun",n:4},{s:"Bauchi",n:3},{s:"Niger",n:3},{s:"Ondo",n:3},
  {s:"Kwara",n:2},{s:"Gombe",n:2},{s:"Cross River",n:2},{s:"Edo",n:1},{s:"Zamfara",n:1},
  {s:"Sokoto",n:1},{s:"Imo",n:1},{s:"Kebbi",n:0},{s:"Plateau",n:2},{s:"Nassarawa",n:1},
  {s:"Katsina",n:0},{s:"Jigawa",n:0},{s:"Yobe",n:0},{s:"Adamawa",n:1},{s:"Bayelsa",n:1},
  {s:"Ekiti",n:0},{s:"Ogun",n:2},{s:"Abia",n:1},{s:"Akwa Ibom",n:1},{s:"Benue",n:2},{s:"Ebonyi",n:0},
];

const states = NIGERIA_STATES.map(x => x.s);
const types: SignupType[] = ["enrolled","enrolled","enrolled","waitlist","waitlist","help"];
const msgs = ["I need more info about payment","When does the programme start?","Can my younger sibling join?","How does the facilitator earn?","Is there a mobile app?"];

export const INITIAL_SIGNUPS: Signup[] = Array.from({length:142},(_,i) => {
  const t = types[rnd(0,5)];
  return { id:i+1, name:randName(), phone:randPhone(), state:states[rnd(0,states.length-1)], programme:PROG_NAMES[rnd(0,5)], type:t, message:t==="help"?msgs[rnd(0,msgs.length-1)]:"", date:randDate(), selected:false };
});

export const INITIAL_FACILITATORS: Facilitator[] = Array.from({length:22},(_,i) => ({
  id:i+1, name:randName(), phone:randPhone(), email:`facilitator${i+1}@gmail.com`,
  school:["Sunrise Secondary","Federal Govt College","Unity Secondary","Community Secondary"][rnd(0,3)]+" "+states[rnd(0,8)],
  state:states[rnd(0,8)], role:["Teacher","Vice Principal","Principal","School Admin Staff"][rnd(0,3)],
  studentsReg:rnd(2,18), status:"active"
}));

export const INITIAL_PROGRAMMES: Programme[] = [
  {id:1,name:"JAMB / WAEC Resit",desc:"Step-by-step preparation to succeed in JAMB and WAEC exams.",track:"secondary awaiting",status:"open",cta:"Start Here",count:48},
  {id:2,name:"Pathway Programme",desc:"University preparation and positioning for opportunities beyond the classroom.",track:"secondary awaiting",status:"open",cta:"Start Here",count:41},
  {id:3,name:"Qampus Programme",desc:"Build income-generating skills while in university.",track:"undergraduate",status:"soon",cta:"Join Waitlist",count:18},
  {id:4,name:"Founders Academy",desc:"Refine, build, and launch a startup for real impact.",track:"undergraduate",status:"soon",cta:"Join Waitlist",count:12},
  {id:5,name:"Q-Lamp",desc:"School-based platform preparing students for JAMB and WAEC.",track:"tools secondary",status:"soon",cta:"Install",count:7},
  {id:6,name:"Qloud Box",desc:"Offline platform giving underserved communities access to resources.",track:"tools secondary",status:"soon",cta:"Install",count:16},
];

export function buildConversations(sups: Signup[]): Conversation[] {
  return sups.filter(s => s.type === "help").slice(0,8).map(s => ({
    id:s.id, name:s.name, phone:s.phone, unread:Math.random()>0.6,
    messages:[{dir:"in" as const, text:s.message, time:"10:32 AM"}]
  }));
}

export function normalizePhone(p: string) {
  p = p.replace(/\D/g,"");
  if (p.startsWith("0")) p = "234" + p.slice(1);
  return p;
}

export function initials(name: string) {
  return name.split(" ").map(x => x[0]).join("");
}