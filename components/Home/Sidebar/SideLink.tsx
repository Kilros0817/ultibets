import { Flex, Image, Tooltip } from "@chakra-ui/react";
import React from "react";

type SideLinkProps = {
  name: string;
  href?: string;
  icon: string;
  sidebarLink?: string;
  setSideBarLink: (value: string | undefined) => void;
};
const SideLink = ({
  name,
  href,
  icon,
  sidebarLink,
  setSideBarLink,
}: SideLinkProps) => {
  
  return (
    <Flex
      ml={"7px"}
      borderRadius={"5px"}
      background={sidebarLink === href ? "#FF9100" : "unset"}
      _hover={{
        background: "#FF9100",
      }}
      onClick={()=>{setSideBarLink(href)}}
      onMouseOver={()=>{setSideBarLink(href)}}
    >
      <Tooltip
        label={name}
        hasArrow
        bg={"#FF9100"}
        placement={"top"}
        borderRadius={"5px"}
      >
        <Image
          px={icon === "/images/svgs/sidebar/nfl.svg" ? "4px" : "1px"}
          py={"1px"}
          src={icon}
          alt={name}
          width={["30px", "30px", "42px", "42px"]}
          height={["30px", "30px", "42px", "42px"]}
        />
      </Tooltip>
    </Flex>
  );
};

export default SideLink;