import {
  FacebookIcon,
  GithubIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@components/Icons";
import { motion } from "framer-motion";
import Logo from "./Logo.js";

const cssStyles = {
  header: "text-primary-dark font-semibold text-lg mb-1",
};

const Footer = () => (
  <div className="pb-8 sm:pb-4">
    <div className="flex justify-center my-8 sm:my-4 sm:flex-col sm:items-center">
      <span className="sm: flex">
        &copy; <Logo className="px-1 cursor-text" imgClass="w-[1rem]" />
      </span>
      {new Date().getFullYear()} All rights reserved.
    </div>

    <div className="flex justify-evenly">
      <div className="flex flex-col">
        <p className={`${cssStyles.header}`}>Support</p>
        <FooterLinks name="Help" />
        <FooterLinks name="FAQ" />
        <FooterLinks name="Contact" link="mailto:hieu.ngo12989@gmail.com" />
      </div>
      <div className="flex flex-col">
        <p className={`${cssStyles.header}`}>Legal</p>
        <FooterLinks name="Privacy" />
        <FooterLinks name="Terms" />
        <FooterLinks name="Cookies" />
      </div>
      <div className="flex flex-col">
        <p className={`${cssStyles.header}`}>Social</p>
        <FooterLinks
          name="LinkedIn"
          icon={<LinkedInIcon />}
          link="https://www.linkedin.com/in/hieu-ngo-ca/"
        />
        <FooterLinks
          name="Facebook"
          icon={<FacebookIcon />}
          link="https://www.facebook.com/"
        />
        <FooterLinks
          name="Twitter"
          icon={<TwitterIcon />}
          link="https://twitter.com/"
        />
        <FooterLinks
          name="Github"
          icon={<GithubIcon />}
          link="https://github.com/hieungo89"
        />
      </div>
    </div>
  </div>
);

export default Footer;

const FooterLinks = ({ name, icon, link, className }) => (
  <motion.a
    href={link}
    target={"_blank"}
    whileHover={{ y: -2 }}
    className={`flex text-dark space-x-1 hover:underline ${className}`}
  >
    {icon}
    <span>{name}</span>
  </motion.a>
);
