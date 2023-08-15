import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const JoinUs = () => {
  return (
    <Box
      mt={["-250px", "-150px", "-180px", "-270px"]}
      mb={["150px", "50px", "80px", "170px"]}
    >
    
      <Box
        display={["none", "none", "block", "block"]}
        width={["300px", "100vw", "100vw", "100vw","98.7vw"]}
        height={["640px", "800px", "1000px", "1200px"]}
        marginLeft={['0px', '0px', '0px', '100px']}
        background={"url(/images/svgs/bg/bg-last.png) center/cover no-repeat"}
      >
        <Flex
          // display={['none', 'flex', 'flex', 'flex']}
          alignItems={"center"}
          position={"relative"}
          top={"45%"}
        >
          <Flex
            display={["none", "none", "flex", "flex"]}
            pl={["40px", "40px", "40px", "80px"]}
          >
            <Image src="/images/svgs/bg/logo-white.svg" alt="logo" />
          </Flex>
          <Flex
            justifyContent={["center", "center", "center", "unset"]}
            alignItems={["center", "center", "center", "unset"]}
            ml={["0px", "0px", "0px", "40px"]}
            px={["00px", "0px", "0px", "0px"]}
            gap={["10px", "20px", "40px", "40px"]}
            direction={"column"}
          >
            <Flex>
              <Text
                fontStyle={"normal"}
                fontWeight={"700"}
                fontSize={["30px", "30px", "30px", "42px"]}
                lineHeight={["40px", "40px", "40px", "57px"]}
                textTransform={"capitalize"}
                color={"#FFFFFF"}
                textAlign={["center", "center", "unset", "unset"]}
              >
                Wanna join the ultiBets team?
              </Text>
            </Flex>
            <Flex
              width={["unset", "310px", "unset", "unset"]}
              direction={"column"}
            >
              <Text
                fontStyle={"normal"}
                fontWeight={"700"}
                fontSize={["15px", "15px", "20px", "22px"]}
                lineHeight={["18px", "20px", "25px", "27px"]}
                color={"#FFFFFF"}
                alignItems={["center", "center", "unset", "unset"]}
              >
                We are always looking for new talents,
              </Text>
              <Text
                fontStyle={"normal"}
                fontWeight={"700"}
                fontSize={["15px", "15px", "20px", "22px"]}
                lineHeight={["18px", "20px", "25px", "27px"]}
                color={"#FFFFFF"}
                alignItems={"start"}
              >
                take the opportunity and send us a message.{" "}
              </Text>
            </Flex>
            <Flex
              alignItems={["center", "center", "center", "unset"]}
              justifyContent={["center", "center", "center", "unset"]}
              mt={["50px", "50px", "0px", "0px"]}
            >
              <a href="https://linktr.ee/UltiBets">
              <Button
                height={"54px"}
                width={"267px"}
                borderRadius={"45px"}
                border={"1px solid #FC541C"}
                background={"unset"}
                _hover={{ background: "#FC541C" }}
              >
                <Text
                  fontFamily={"Nunito"}
                  fontStyle={"normal"}
                  fontWeight={"700"}
                  fontSize={"22px"}
                  lineHeight={"30px"}
                  textTransform={"capitalize"}
                  color={"#FFFFFF"}
                >
                  Contact us now
                </Text>
              </Button>
              </a>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Box mt={"-750px"} display={["block", "block", "none", "none"]}>
        <Image
          src={"/images/svgs/bg/last-bg-mobile.png"}
          alt={"bg"}
          width={["100vw", "100vw", "100vw", "100vw"]}
          height={"auto"}
        />
        <Flex
          display={["flex", "flex", "flex", "flex"]}
          mt={"100"}
          mb={["100px", "100px", "100px", "200px"]}
          alignItems={"center"}
        >
          <Flex
            display={["none", "flex", "flex", "flex"]}
            pl={["40px", "40px", "40px", "80px"]}
          >
            <Image src="/images/svgs/bg/logo-white.svg" alt="logo" />
          </Flex>
          <Flex
            justifyContent={["center", "center", "center", "unset"]}
            alignItems={["center", "center", "center", "unset"]}
            ml={["0px", "0px", "0px", "40px"]}
            px={["00px", "0px", "0px", "0px"]}
            gap={["10px", "20px", "40px", "40px"]}
            direction={"column"}
          >
            <Flex>
              <Text
                fontStyle={"normal"}
                fontWeight={"700"}
                fontSize={["30px", "30px", "30px", "42px"]}
                lineHeight={["40px", "40px", "40px", "57px"]}
                textTransform={"capitalize"}
                color={"#FFFFFF"}
                textAlign={["center", "center", "unset", "unset"]}
              >
                Wanna join the ultiBets team?
              </Text>
            </Flex>
            <Flex
              width={["unset", "310px", "unset", "unset"]}
              direction={"column"}
            >
              <Text
                fontStyle={"normal"}
                fontWeight={"700"}
                fontSize={["15px", "15px", "20px", "22px"]}
                lineHeight={["18px", "20px", "25px", "27px"]}
                color={"#FFFFFF"}
                alignItems={["center", "center", "unset", "unset"]}
              >
                We are always looking for new talents,
              </Text>
              <Text
                fontStyle={"normal"}
                fontWeight={"700"}
                fontSize={["15px", "15px", "20px", "22px"]}
                lineHeight={["18px", "20px", "25px", "27px"]}
                color={"#FFFFFF"}
                alignItems={"start"}
              >
                take the opportunity and send us a message.{" "}
              </Text>
            </Flex>
            <Flex
              alignItems={["center", "center", "center", "unset"]}
              justifyContent={["center", "center", "center", "unset"]}
              mt={["50px", "50px", "0px", "0px"]}
            >
              <a href="https://linktr.ee/UltiBets">

              <Button
                height={"54px"}
                width={"267px"}
                borderRadius={"45px"}
                border={"1px solid #FC541C"}
                background={"unset"}
                _hover={{ background: "#FC541C" }}
              >
                <Text
                  fontFamily={"Nunito"}
                  fontStyle={"normal"}
                  fontWeight={"700"}
                  fontSize={"22px"}
                  lineHeight={"30px"}
                  textTransform={"capitalize"}
                  color={"#FFFFFF"}
                >
                  Contact us now
                </Text>
              </Button>
              </a>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default JoinUs;
