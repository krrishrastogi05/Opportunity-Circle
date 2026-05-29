import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Company Explorer",
  description: "Browse company profiles — hiring style, DSA expectations, opportunity types, and what each company generally looks for.",
};

const GoogleG = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M43.6 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11C34.5 31 32.9 33 30.5 34.4v4.5h6.9C41.2 35.2 43.6 30.3 43.6 24.5z" fill="#4285F4"/>
    <path d="M24 44c5.4 0 9.9-1.8 13.2-4.8l-6.9-4.5c-1.8 1.2-4.1 1.9-6.4 1.9-4.9 0-9-3.3-10.5-7.8H6.5v4.6C9.8 39.9 16.4 44 24 44z" fill="#34A853"/>
    <path d="M13.5 28.8c-.4-1.2-.6-2.5-.6-3.8s.2-2.6.6-3.8v-4.6H6.5C5 19.4 4 21.6 4 24s1 4.6 2.5 7.4l7-5.6z" fill="#FBBC05"/>
    <path d="M24 10.4c2.7 0 5.1 1 7 2.8l5.2-5.2C32.9 5 28.4 3 24 3 16.4 3 9.8 7.1 6.5 13.4l7 5.6C15 14.7 19.1 10.4 24 10.4z" fill="#EA4335"/>
  </svg>
);

const MSSquares = () => (
  <svg width="22" height="22" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
    <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
    <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
    <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
  </svg>
);

type CompanyEntry = {
  slug: string;
  name: string;
  tags: string;
  bg: string;
  border?: boolean;
  content: React.ReactNode;
};

const companies: CompanyEntry[] = [
  {
    slug: "amazon",    name: "Amazon",
    tags: "Big Tech · E-commerce · Cloud (AWS) · DSA + LP",
    bg: "bg-white", border: true,
    content: <Image src="/companies/amazon.png" alt="Amazon" width={36} height={36} className="object-contain" />,
  },
  {
    slug: "google",    name: "Google",
    tags: "Big Tech · Search & Cloud · Pure DSA · STEP Intern",
    bg: "bg-white", border: true,
    content: <GoogleG />,
  },
  {
    slug: "microsoft", name: "Microsoft",
    tags: "Big Tech · Cloud & Productivity · DSA + CS Fundamentals · Very Broad Campus",
    bg: "bg-white", border: true,
    content: <MSSquares />,
  },
  {
    slug: "flipkart",  name: "Flipkart",
    tags: "Indian E-commerce · Machine Coding Round · Campus-Heavy",
    bg: "bg-[#2874F0]",
    content: <span style={{ color:"#fff", fontSize:20, fontWeight:800, fontFamily:"sans-serif" }}>F</span>,
  },
  {
    slug: "rippling",  name: "Rippling",
    tags: "HR Tech · SaaS · LLD-Heavy · Tier-1 Campus + Off-campus",
    bg: "bg-[#FFCE00]",
    content: <span style={{ color:"#000", fontSize:20, fontWeight:800, fontFamily:"sans-serif" }}>R</span>,
  },
  {
    slug: "razorpay",  name: "Razorpay",
    tags: "Indian Fintech · Payments · CS Fundamentals + Project Depth",
    bg: "bg-[#2EB5C0]",
    content: <span style={{ color:"#fff", fontSize:16, fontWeight:800, fontFamily:"sans-serif" }}>Rp</span>,
  },
  {
    slug: "uber",      name: "Uber",
    tags: "Ride-hailing · Real-time Systems · High DSA Bar · LLD + HLD",
    bg: "bg-black",
    content: <span style={{ color:"#fff", fontSize:20, fontWeight:800, fontFamily:"sans-serif" }}>U</span>,
  },
  {
    slug: "atlassian", name: "Atlassian",
    tags: "Dev Tools · Jira & Confluence · Code Quality Focus · Values-Driven",
    bg: "bg-[#0052CC]",
    content: <span style={{ color:"#fff", fontSize:20, fontWeight:800, fontFamily:"sans-serif" }}>A</span>,
  },
  {
    slug: "meesho",    name: "Meesho",
    tags: "Social Commerce · AI Screening · Machine Coding · Bangalore",
    bg: "bg-[#F43397]",
    content: <span style={{ color:"#fff", fontSize:20, fontWeight:800, fontFamily:"sans-serif" }}>M</span>,
  },
  {
    slug: "swiggy",    name: "Swiggy",
    tags: "Food Delivery · Quick Commerce · Machine Coding · Bangalore",
    bg: "bg-[#FC8019]",
    content: <span style={{ color:"#fff", fontSize:20, fontWeight:800, fontFamily:"sans-serif" }}>S</span>,
  },
  {
    slug: "zomato",    name: "Zomato",
    tags: "Food Tech · Blinkit · Engineering Intuition · DSA + DBMS · Gurugram",
    bg: "bg-[#E23744]",
    content: <span style={{ color:"#fff", fontSize:20, fontWeight:800, fontFamily:"sans-serif" }}>Z</span>,
  },
  {
    slug: "phonepe",   name: "PhonePe",
    tags: "UPI & Payments · Fintech · High DSA Bar · LLD + Concurrency · Bangalore",
    bg: "bg-[#5F259F]",
    content: <span style={{ color:"#fff", fontSize:16, fontWeight:800, fontFamily:"sans-serif" }}>Pe</span>,
  },
  {
    slug: "freshworks", name: "Freshworks",
    tags: "Indian SaaS · CRM & Helpdesk · Accessible DSA · OOP + SQL · Chennai",
    bg: "bg-[#25C16F]",
    content: <span style={{ color:"#fff", fontSize:16, fontWeight:800, fontFamily:"sans-serif" }}>fw</span>,
  },
];

export default function CompaniesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Company Explorer</h1>
      <p className="text-muted-foreground mb-10">
        Uniform company profiles — not job listings. Understand what each company is like before you prepare.
      </p>

      <div>
        {companies.map((c) => (
          <Link key={c.slug} href={`/companies/${c.slug}`}
            className="flex items-center gap-4 py-5 border-b border-border hover:bg-accent/20 transition-colors rounded-lg px-2 -mx-2 group">
            <div className={`w-12 h-12 rounded-xl ${c.bg} ${c.border ? "border border-border" : ""} flex items-center justify-center shrink-0 overflow-hidden p-1`}>
              {c.content}
            </div>
            <div>
              <p className="font-semibold text-sm group-hover:underline">{c.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{c.tags}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
