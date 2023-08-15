import { Box, Center, Container, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const Partners = () => {
  return (
    <Box
      mt={["100px", "130px", "180px", "200px"]}
      mb={"150px"}
      position={"relative"}
    >
      <Flex
        mt={["-100px", "100px", "100px", "100px"]}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text
          fontFamily={"Nunito"}
          fontStyle={"normal"}
          fontWeight={"700"}
          fontSize={["25px", "30px", "30px", "50px"]}
          lineHeight={["41px", "41px", "34px", "68px"]}
          textTransform={"capitalize"}
          color={"#FFFFFF"}
        >
          UltiBets Partners
        </Text>
      </Flex>

      <Flex
        mt={["50px", "150px", "150px", "150px"]}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Flex
          justifyContent={"center"}
          gap={["50px", "50px", "30px", "20px", "100px", "150px", "250px"]}
          direction={["column", "column", "column", "row"]}
        >
          <Image
            src={"/images/svgs/Chainlink_logo.svg"}
            width={["200px", "200px", "250px", "220px", "250px", "350px"]}
            height={"auto"}
          />
          <Image
            src={"/images/svgs/Thorstarter_logo.svg"}
            position={"relative"}
            width={["200px", "200px", "250px", "220px", "250px", "350px"]}
            height={"auto"}
          />

          <Image
            src={"/images/svgs/GA_logo.svg"}
            width={["200px", "200px", "250px", "220px", "250px", "350px"]}
            height={"auto"}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Partners;
