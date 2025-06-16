import { FaUsers, FaUserTie } from "react-icons/fa";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { LuPackageSearch } from "react-icons/lu";
import { AuthenticatedRoutes } from "../Routes";
import { FaRegNewspaper, FaWallet } from "react-icons/fa6";
import { MdOutlineAddCard } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { MainContent } from "./MainContent";
import { TfiAnnouncement } from "react-icons/tfi";

export const SidebarContent = {
    user: [
        {
            id: "Dashboard",
            icon: <HiOutlineSquares2X2 />,
            name: "Dashboard",
            link: AuthenticatedRoutes.USER_DASHBOARD,
        },

        {
            id: "Income Report",
            icon: <LuPackageSearch />,
            name: "Income Report",
            options: [
                {
                    id: "Referral Income",
                    name: "Referral Income",
                    link: AuthenticatedRoutes.REFERRAL_INCOME_REPORT,
                },
                {
                    id: "ROI Income",
                    name: "ROI Income",
                    link: AuthenticatedRoutes.ROI_INCOME_REPORT,
                },
                // {
                //   id: "Spin Income",
                //   name: "Spin Income",
                //   link: AuthenticatedRoutes.SPIN_INCOME_REPORT,
                // },
                // {
                //   id: "Royalty Income",
                //   name: "ROI Income",
                //   link: AuthenticatedRoutes.ROYALTY_INCOME_REPORT,
                // },
                {
                    id: "Level Income",
                    name: "Level Income",
                    link: AuthenticatedRoutes.LEVEL_INCOME_REPORT,
                },
                // {
                //     id: "Matching Income",
                //     name: "Matching Income",
                //     link: AuthenticatedRoutes.MATCHING_INCOME_REPORT,
                // },
            ],
        },
        {
            id: "Wallet",
            icon: <FaWallet />,
            name: "Wallet",
            options: [
                {
                    id: "Wallet",
                    name: "Wallet",
                    link: AuthenticatedRoutes.WALLET,
                },
                {
                    id: "Withdrawal Report",
                    name: "Withdrawal Report",
                    link: AuthenticatedRoutes.WITHDRAWAL_REPORT,
                },
            ],
        },
        {
            id: "Our Team",
            icon: <FaUsers />,
            name: "Our Team",
            options: [
                {
                    id: "Direct",
                    name: "Direct",
                    link: AuthenticatedRoutes.TEAM_DIRECT,
                },
                {
                    id: "Levels",
                    name: "Levels",
                    link: AuthenticatedRoutes.TEAM_TREE,
                },
            ],
        },
        {
            id: "OurPlan",
            icon: <MdOutlineAddCard />,
            name: "Our Plan",
            options: [
                {
                    id: "Our Plans",
                    name: "Our Plans",
                    link: AuthenticatedRoutes.OUR_PLANS,
                },
                {
                    id: "Purchase Plan History",
                    name: "Purchase Plan History",
                    link: AuthenticatedRoutes.PURCHASE_PLAN_HISTORY,
                },
            ],
        },
        {
            id: "Email Registration",
            icon: <TfiAnnouncement />,
            name: "Email Registration",
            link: AuthenticatedRoutes.EMAIL_REGISTRATION,
        },
        {
            id: "Notification & Announcements",
            icon: <TfiAnnouncement />,
            name: "Notification & Announcements",
            link: AuthenticatedRoutes.NEWS_AND_NOTIF,
        },
        {
            id: "Support",
            icon: <BiSupport />,
            name: "Help & Support",
            options: [
                {
                    id: "Support",
                    name: "Raise Ticket",
                    link: AuthenticatedRoutes.SUPPORT_RAISE_TICKET,
                },
                {
                    id: "Support History",
                    name: "Raise Ticket History",
                    link: AuthenticatedRoutes.SUPPORT_RAISE_TICKET_HISTORY,
                },
                {
                    id: "Connect on Telegram",
                    name: "Connect on Telegram",
                    link: MainContent.telegram_link,
                    external: true,
                },
            ],
        },
        // {
        //   id: "Profile",
        //   icon: <FaUserTie />,
        //   name: "Account Setting",
        //   options: [
        //     {
        //       id: "Profile",
        //       name: "Profile",
        //       link: AuthenticatedRoutes.USER_PROFILE,
        //     },

        //   ],
        // },
    ],
    admin: [
        {
            id: "Dashboard",
            icon: <HiOutlineSquares2X2 />,
            name: "Dashboard",
            link: AuthenticatedRoutes.ADMIN_DASHBOARD,
        },
        {
            id: "Users",
            icon: <FaUsers />,
            name: "Users",
            options: [
                {
                    id: "All Users",
                    icon: <FaUsers />,
                    name: "All Users",
                    link: AuthenticatedRoutes.ALL_USERS,
                },
                {
                    id: "Active Users",
                    icon: <FaUsers />,
                    name: "Active Users",
                    link: AuthenticatedRoutes.ACTIVE_USERS,
                },
            ],
        },

        {
            id: "financialReports",
            icon: <FaUserTie />,
            name: "Financial Reports",
            options: [
                {
                    id: "Transaction History",
                    name: "Package Purchase History",
                    link: AuthenticatedRoutes.PURCHASE_PLAN_HISTORY,
                },
                {
                    id: "Referral Income History",
                    name: "Referral Income History",
                    link: AuthenticatedRoutes.DIRECT_REFERRAL_INCOME_REPORT,
                },
                {
                    id: "level Income History",
                    name: "Level Income History",
                    link: AuthenticatedRoutes.LEVEL_INCOME_REPORT,
                },
                {
                    id: "ROI Income History",
                    name: "ROI Income History",
                    link: AuthenticatedRoutes.ROI_INCOME_HISTORY,
                },
                // {
                //     id: "Airdrop Income History",
                //     name: "Airdrop Income History",
                //     link: AuthenticatedRoutes.DIRECT_REFERRAL_INCOME_REPORT,
                // },
            ],
        },
        {
            id: "Withdrawal Request",
            icon: <FaWallet />,
            name: "Withdrawal",
            options: [
                // {
                //     id: "Withdrawal Update",
                //     name: "Withdrawal Update",
                //     link: AuthenticatedRoutes.WITHDRAWAL_UPDATE,
                // },
                {
                    id: "Withdrawal History",
                    name: "Withdrawal History",
                    link: AuthenticatedRoutes.APPROVED_WITHDRAWAL_REQUEST,
                },
            ],
        },
        {
            id: "Admin Control",
            icon: <FaWallet />,
            name: "Admin Control",
            options: [
                // {
                //     id: "Withdrawal Update",
                //     name: "Withdrawal Update",
                //     link: AuthenticatedRoutes.WITHDRAWAL_UPDATE,
                // },
                {
                    id: "Transaction Limit",
                    name: "Transaction Limit",
                    link: AuthenticatedRoutes.TRANSACTION_LIMIT,
                },
                {
                    id: "Min-Max Limit",
                    name: "Min-Max Limit",
                    link: AuthenticatedRoutes.MIN_MAX_LIMIT,
                },
                {
                    id: "Min Package Amount",
                    name: "Min Package Amount",
                    link: AuthenticatedRoutes.MIN_PACKAGE_AMOUNT,
                },
                {
                    id: "Withdrawal Block",
                    name: "Withdrawal Block",
                    link: AuthenticatedRoutes.WITHDRAWAL_BLOCK,
                },
                {
                    id: "User Transaction Limit",
                    name: "User Transaction Limit",
                    link: AuthenticatedRoutes.USER_TRANSACTION_LIMIT,
                },
            ],
        },
        {
            id: "Upload Banners",
            icon: <FaRegNewspaper />,
            name: "Upload Banners",
            link: AuthenticatedRoutes.NEWS_AND_NOTIF_ADMIN,
        },
        {
            id: "Support",
            icon: <BiSupport />,
            name: "Help & Support",
            options: [
                {
                    id: "Support history",
                    name: "Raise Ticket History",
                    link: AuthenticatedRoutes.RAISE_TICKET_LIST,
                },
            ],
        },
    ],
};
