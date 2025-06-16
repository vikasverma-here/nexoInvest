import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../assets";
import { links } from "../config";
import bran1 from "../assets/brandsLogo/bitcoin-btc-logo.png";
import bran5 from "../assets/brandsLogo/bnb-bnb-logo.png";
import bran2 from "../assets/brandsLogo/dogecoin-doge-logo.png";
import bran3 from "../assets/brandsLogo/ethereum-eth-logo.png";
import bran4 from "../assets/brandsLogo/tether-usdt-logo.png";

export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Pricing",
    url: "#pricing",
  },
  {
    id: "2",
    title: "How to use",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Roadmap",
    url: "#roadmap",
  },
  {
    id: "4",
    title: "login",
    url: "/login",
    onlyMobile: true,
    external: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [bran1, bran2, bran3, bran4, bran5];

export const brainwaveServices = [
  "Real-time Market Insights",
  "Personalized Investment Recommendations",
  "Seamless Portfolio Management",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "AI-Powered Investment Guide",
    text: "Launch of our intelligent assistant that helps users navigate investment options based on live market trends and risk profiles.",
    date: "Jan 2025",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Interactive Rewards System",
    text: "Introduce gamified incentives like badges, referral boosters, and achievement levels to boost platform engagement and team growth.",
    date: "Feb 2025",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Dashboard Personalization",
    text: "Enable users to personalize their dashboard — including layout, color themes, and preferred analytics — for a smoother experience.",
    date: "Mar 2025",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "API-Driven Live Insights",
    text: "Integrate financial data APIs to display real-time updates, market news, and token prices directly inside the platform.",
    date: "Apr 2025",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";

export const collabContent = [
  {
    id: "0",
    title: "Seamless Integration",
    text: collabText,
  },
  {
    id: "1",
    title: "Smart Automation",
  },
  {
    id: "2",
    title: "Top-notch Security",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

// export const pricing = [
//   {
//     id: "0",
//     title: "Basic",
//     description: "AI chatbot, personalized recommendations",
//     price: "0",
//     features: [
//       "An AI chatbot that can understand your queries",
//       "Personalized recommendations based on your preferences",
//       "Ability to explore the app and its features without any cost",
//     ],
//     premium: false,
//   },
//   {
//     id: "1",
//     title: "Premium",
//     description: "Advanced AI chatbot, priority support, analytics dashboard",
//     price: "9.99",
//     features: [
//       "An advanced AI chatbot that can understand complex queries",
//       "An analytics dashboard to track your conversations",
//       "Priority support to solve issues quickly",
//     ],
//     premium: true,
//   },
//   {
//     id: "2",
//     title: "Enterprise",
//     description: "Custom AI chatbot, advanced analytics, dedicated account",
//     price: null,
//     features: [
//       "An AI chatbot that can understand your queries",
//       "Personalized recommendations based on your preferences",
//       "Ability to explore the app and its features without any cost",
//     ],
//     premium: false,
//   },
// ];

export const plans = [
  {
    id: "0",
    title: "Smart Insights",
    description: "Stay ahead with curated market predictions.",
    features: [
      "Daily AI-powered market overviews",
      "Quick access to trending sectors",
      "Beginner-friendly insights for new investors",
    ],
    premium: false,
  },
  {
    id: "1",
    title: "Portfolio Optimizer",
    description: "Let AI refine your investment strategy.",
    features: [
      "Real-time portfolio performance tracking",
      "AI suggestions to rebalance investments",
      "Visualize risk & returns with smart charts",
    ],
    premium: true,
  },
  {
    id: "2",
    title: "Investor Intelligence Hub",
    description: "Deep analytics and custom AI recommendations.",
    features: [
      "Advanced trend analysis tools",
      "Custom-built reports for individual goals",
      "Access to exclusive investment strategies",
    ],
    premium: true,
  },
];

export const benefits = [
  {
    id: "0",
    title: "Smart Investment Insights",
    text: "Get AI-powered insights and recommendations to make smarter crypto investment decisions with Nexo Investment.",
    backgroundUrl: "/src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Daily Growth Tracking",
    text: "Track your portfolio growth and market trends every day with real-time analytics designed for Nexo investors.",
    backgroundUrl: "/src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Accessible Anywhere",
    text: "Manage your crypto assets and investments from anywhere with Nexo Investment’s mobile-friendly dashboard.",
    backgroundUrl: "/src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  // {
  //   id: "3",
  //   title: "Instant Transactions",
  //   text: "Experience fast deposits, withdrawals, and transfers on the Nexo Investment platform with secure blockchain support.",
  //   backgroundUrl: "/src/assets/benefits/card-4.svg",
  //   iconUrl: benefitIcon4,
  //   imageUrl: benefitImage2,
  //   light: true,
  // },
  // {
  //   id: "4",
  //   title: "Secure Wallet Management",
  //   text: "Safely store and manage your digital assets using our integrated wallet services with top-grade encryption.",
  //   backgroundUrl: "/src/assets/benefits/card-5.svg",
  //   iconUrl: benefitIcon1,
  //   imageUrl: benefitImage2,
  // },
  // {
  //   id: "5",
  //   title: "AI-Powered Forecasting",
  //   text: "Leverage powerful AI algorithms to forecast crypto trends and make data-driven investment choices.",
  //   backgroundUrl: "/src/assets/benefits/card-6.svg",
  //   iconUrl: benefitIcon2,
  //   imageUrl: benefitImage2,
  // },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
