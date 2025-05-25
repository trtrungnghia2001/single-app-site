import AssassinImage from "assets/images/champion-types/champion_assassin-image.png";
import FighterImage from "assets/images/champion-types/champion_fighter-image.png";
import MageImage from "assets/images/champion-types/champion_mage-image.png";
import MarksmanImage from "assets/images/champion-types/champion_marksman-image.png";
import SupportImage from "assets/images/champion-types/champion_support-image.png";
import TankImage from "assets/images/champion-types/champion_tank-image.png";
import { ReactComponent as AssassinIcon } from "assets/images/champion-types/champion_assassin-icon.svg";
import { ReactComponent as FighterIcon } from "assets/images/champion-types/champion_fighter-icon.svg";
import { ReactComponent as MageIcon } from "assets/images/champion-types/champion_mage-icon.svg";
import { ReactComponent as MarksmanIcon } from "assets/images/champion-types/champion_marksman-icon.svg";
import { ReactComponent as SupportIcon } from "assets/images/champion-types/champion_support-icon.svg";
import { ReactComponent as TankIcon } from "assets/images/champion-types/champion_tank-icon.svg";
import { ReactComponent as LogoIcon } from "assets/images/logo/logo.svg";

import {
  FaYoutube,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaReddit,
} from "react-icons/fa";

export const menuLink = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Champion",
    path: "/champion-list",
  },
  {
    title: "Item",
    path: "/item-list",
  },
  {
    title: "Other",
    path: "/other",
  },
];
export const contactLinkList = [
  {
    title:"Youtube",
    value:"",
    icon: <FaYoutube/>,
  },
  {
    title:"Twitter",
    value:"",
    icon: <FaTwitter/>,
  },
  {
    title:"Facebook",
    value:"",
    icon: <FaFacebook/>,
  },
  {
    title:"Instagram",
    value:"",
    icon: <FaInstagram/>,
  },
  {
    title:"Reddit",
    value:"",
    icon: <FaReddit/>,
  },
  
]
export const championDataType = [
  {
    title: "all",
    value: "all",
    path: "/all",
  },
  {
    title: "assassin",
    value: "assassin",
    path: "/assassin",
    icon: <AssassinIcon />,
    image: AssassinImage,
  },
  {
    title: "fighter",
    value: "fighter",
    path: "/fighter",
    icon: <FighterIcon />,
    image: FighterImage,
  },
  {
    title: "mage",
    value: "mage",
    path: "/mage",
    icon: <MageIcon />,
    image: MageImage,
  },
  {
    title: "marksman",
    value: "marksman",
    path: "/marksman",
    icon: <MarksmanIcon />,
    image: MarksmanImage,
  },
  {
    title: "support",
    value: "support",
    path: "/support",
    icon: <SupportIcon />,
    image: SupportImage,
  },
  {
    title: "tank",
    value: "tank",
    path: "/tank",
    icon: <TankIcon />,
    image: TankImage,
  },
];

export const championDataDifficulties = [
  {
    title: "ALL DIFFICULTIES",
    value: "all",
  },
  {
    title: "hard",
    value: "hard",
  },
  {
    title: "moderate",
    value: "moderate",
  },
  {
    title: "easy",
    value: "easy",
  },
];

export { LogoIcon };
