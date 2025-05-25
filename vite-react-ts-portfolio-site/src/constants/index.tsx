import { BiSupport } from "react-icons/bi";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import {
  FiBluetooth,
  FiBook,
  FiBriefcase,
  FiFileText,
  FiHome,
  FiUser,
} from "react-icons/fi";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";

export const avatar_url = `https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/67444f862170a1001de23110.jpg`;

export const header_links = [
  {
    label: "Home",
    path: `home`,
    icon: <FiHome />,
  },
  {
    label: "About",
    path: `about`,
    icon: <FiUser />,
  },
  {
    label: "Skills",
    path: `skills`,
    icon: <FiFileText />,
  },
  {
    label: "Portfolio",
    path: `portfolio`,
    icon: <FiBook />,
  },
  {
    label: "Testimonial",
    path: `testimonial`,
    icon: <FiBriefcase />,
  },
  {
    label: "Contact",
    path: `contact`,
    icon: <FiBluetooth />,
  },
];
export const social_links = [
  {
    icon: <FaFacebook />,
    path: `https://www.facebook.com/`,
  },
  {
    icon: <FaInstagram />,
    path: `https://www.instagram.com/`,
  },
  {
    icon: <FaTwitter />,
    path: `https://x.com/`,
  },
  {
    icon: <FaGithub />,
    path: `https://github.com/`,
  },
  {
    icon: <FaYoutube />,
    path: `https://www.youtube.com`,
  },
];
export const about = [
  {
    icon: <BiSupport />,
    label: `Experience`,
    content: `8 Years Working`,
  },
  {
    icon: <BiSupport />,
    label: `Completed`,
    content: `48 Projects`,
  },
  {
    icon: <BiSupport />,
    label: `Support`,
    content: `Online 24/7`,
  },
];
export const skills = [
  {
    label: `Frontend developer`,
    children: [
      {
        label: `HTML`,
        content: `Basic`,
      },
      {
        label: `Bootstrap`,
        content: `Intermediate`,
      },
      {
        label: `CSS`,
        content: `Advanced`,
      },
      {
        label: `Git`,
        content: `Intermediate`,
      },
      {
        label: `JavaScript`,
        content: `Intermediate`,
      },
      {
        label: `React`,
        content: `Intermediate`,
      },
    ],
  },
  {
    label: `Backend developer`,
    children: [
      {
        label: `PHP`,
        content: `Intermediate`,
      },
      {
        label: `MySQL`,
        content: `Intermediate`,
      },
      {
        label: `Node js`,
        content: `Basic`,
      },
      {
        label: `Firebase`,
        content: `Intermediate`,
      },
      {
        label: `Python`,
        content: `Intermediate`,
      },
      {
        label: `SQL`,
        content: `Intermediate`,
      },
    ],
  },
];
export const category = [`All`, `Web`, `App`, `Design`];

export const contact = [
  {
    icon: <MdOutlineEmail />,
    label: `Email`,
    content: `tr.trungnghia2001@gmail.com`,
  },
  {
    icon: <IoLogoWhatsapp />,
    label: `Whatsapp`,
    content: `999-888-777`,
  },
  {
    icon: <AiOutlineMessage />,
    label: `Messager`,
    content: `user.fb123`,
  },
];

import Work1 from "@/assets/work1.jpg";
import Work2 from "@/assets/work2.jpg";
import Work3 from "@/assets/work3.jpg";
import Work4 from "@/assets/work4.jpg";
import Work5 from "@/assets/work5.jpg";

export const projectsData = [
  {
    id: 1,
    image: Work1,
    title: "Web design",
    category: "web",
  },
  {
    id: 2,
    image: Work2,
    title: "App movil",
    category: "app",
  },
  {
    id: 3,
    image: Work3,
    title: "Brand design",
    category: "design",
  },
  {
    id: 4,
    image: Work4,
    title: "App movil",
    category: "app",
  },
  {
    id: 5,
    image: Work5,
    title: "Web design",
    category: "web",
  },
];

import Image1 from "@/assets/testimonial1.png";
import Image2 from "@/assets/testimonial2.png";
import Image3 from "@/assets/testimonial3.png";
import Image4 from "@/assets/testimonial4.png";
import Image5 from "@/assets/testimonial5.png";

export const testimonialData = [
  {
    id: 1,
    image: Image1,
    title: "Jhon Doe",
    description:
      "A really good job, all aspects of the project were followed step by step and with good results.",
  },
  {
    id: 2,
    image: Image2,
    title: "Harry Clinton",
    description:
      "A really good job, all aspects of the project were followed step by step and with good results.",
  },
  {
    id: 3,
    image: Image3,
    title: "Sara Cill",
    description:
      "A really good job, all aspects of the project were followed step by step and with good results.",
  },
  {
    id: 4,
    image: Image4,
    title: "Nagato",
    description:
      "A really good job, all aspects of the project were followed step by step and with good results.",
  },
  {
    id: 5,
    image: Image5,
    title: "Obito",
    description:
      "A really good job, all aspects of the project were followed step by step and with good results.",
  },
];
