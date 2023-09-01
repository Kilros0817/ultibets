import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import "@fontsource/inter";

const About = () => {
  return (
    <Box
      mt={["150px", "300px", "150px", "150px"]}
    >
      <Box
        display={["none", "none", "none", "block"]}
        mt={"150px"}
        position={"relative"}
      >
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Text
            fontFamily={["unset", "unset", "Nunito", "Nunito"]}
            fontStyle={"normal"}
            fontWeight={"700"}
            fontSize={["25px", "30px", "50px", "50px"]}
            lineHeight={["34px", "40px", "68px", "68px"]}
            textTransform={"capitalize"}
            color={"#FFFFFF"}
            ml={["0px", "0px", "50px", "70px"]}
          >
            About UltiBets{" "}
          </Text>
          <Image
            src={"/images/svgs/bg/small-bg.svg"}
            alt={"UltiBets Logo"}
            width={["30px", "30px", "70px", "52px"]}
            height={["30px", "30px", "70px", "152px"]}
            ml={"20px"}
          />
        </Flex>
        <Flex
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"80px"}
        >
          <Flex
            gap={["5px", "20px", "40px", "50px"]}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Image
                src={"/images/svgs/bg/blockchain-bg.svg"}
                alt={"UltiBets Logo"}
                width={"124px"}
                height={"124px"}
              />
            </Flex>
            <Flex
              width={["unset", "unset", "unset", "600px"]}
              justifyContent={"center"}
              direction={"column"}
              alignItems={["center", "center", "center", "start"]}
              gap={"15px"}
            >
              <Text
                fontWeight={"700"}
                alignItems={["center", "center", "center", "start"]}
                fontStyle={"normal"}
                fontSize={["22px", "22px", "22px", "32px"]}
                lineHeight={["27px", "27px", "27px", "68px"]}
                textTransform={"capitalize"}
                color={"#FFFFFF"}
              >
                Various Formats and Categories
              </Text>
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                direction={"column"}
              >
                <Text
                  fontFamily={"Inter"}
                  fontWeight={"500"}
                  fontStyle={"normal"}
                  fontSize={"22px"}
                  color={"#FFFFFF"}
                  lineHeight={"27px"}
                  letterSpacing={"0.02em"}
                  width={"530px"}
                >
                  <Text as={"span"} color={"#E18935"}>
                    {/* &nsbp;  */}
                    Home / Draw / Away
                  </Text>
                  &nbsp;Predictions,
                  <Text as={"span"} color={"#E18935"}>
                    {/* &nsbp;  */}
                    &nbsp;Yes/No Binary
                  </Text>
                  &nbsp; Predictions and
                  <Text as={"span"} color={"#E18935"}>
                    &nbsp;Side
                  </Text>
                  &nbsp;Predictions will be
                  <Text as={"span"} color={"#E18935"}>
                    &nbsp;available in 11 categories.
                  </Text>
                </Text>
              </Flex>
              {/* </Slide> */}
            </Flex>
          </Flex>
          <Flex gap={"50px"} justifyContent={"center"} alignItems={"center"}>
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Image
                mt={"15px"}
                src={"/images/svgs/bg/block-bg.svg"}
                alt={"UltiBets Logo"}
                width={"128px"}
                height={"128px"}
              />
            </Flex>
            <Flex
              justifyContent={"center"}
              direction={"column"}
              alignItems={"start"}
              width={"600px"}
              gap={"15px"}
            >
              <Text
                textAlign={"start"}
                fontWeight={"700"}
                fontStyle={"normal"}
                fontSize={"32px"}
                lineHeight={"68px"}
                textTransform={"capitalize"}
                color={"#FFFFFF"}
              >
                Powered By Blockchain Technology{" "}
              </Text>
              <Text
                fontFamily={"Inter"}
                fontWeight={"500"}
                fontStyle={"normal"}
                fontSize={"22px"}
                color={"#FFFFFF"}
                lineHeight={"27px"}
                letterSpacing={"0.02em"}
                width={"600px"}
              >
                Predictions are coded into
                <Text as={"span"} color={"#E18935"}>
                  {/* &nsbp;  */}
                  &nbsp;smart contracts&nbsp;
                </Text>
                and deployed onto the blockchain
                <Text as={"span"} color={"#E18935"}>
                  {`  assuring fairness and transparency.`}
                </Text>
              </Text>
            </Flex>
          </Flex>
          <Flex gap={"50px"} justifyContent={"center"} alignItems={"center"}>
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Image
                mt={"15px"}
                src={"/images/svgs/bg/profit-bg.svg"}
                alt={"UltiBets Logo"}
                width={"138px"}
                height={"138px"}
              />
            </Flex>
            <Flex
              width={"600px"}
              justifyContent={"center"}
              direction={"column"}
              alignItems={"start"}
              gap={"15px"}
            >
              <Text
                textAlign={"start"}
                fontWeight={"700"}
                fontStyle={"normal"}
                fontSize={"32px"}
                lineHeight={"68px"}
                textTransform={"capitalize"}
                color={"#FFFFFF"}
              >
                a new gain system with pool sides{" "}
              </Text>
              <Box width={"639px"}>
                <Text
                  as={"span"}
                  fontFamily={"Inter"}
                  fontWeight={"500"}
                  fontStyle={"normal"}
                  fontSize={"22px"}
                  color={"#FFFFFF"}
                  lineHeight={"27px"}
                  letterSpacing={"0.02em"}
                >
                  Gains are based on the percentage of share you own from your
                  side selection.
                </Text>
                <Text
                  fontFamily={"Inter"}
                  fontWeight={"500"}
                  fontStyle={"normal"}
                  fontSize={"22px"}
                  lineHeight={"27px"}
                  letterSpacing={"0.02em"}
                  as={"span"}
                  color={"#E18935"}
                >
                  &nbsp;The more you predict, the more you gain from the other side
                  if your win.
                </Text>
                <Text
                  fontFamily={"Inter"}
                  fontWeight={"500"}
                  fontStyle={"normal"}
                  fontSize={"22px"}
                  color={"#FFFFFF"}
                  lineHeight={"27px"}
                  letterSpacing={"0.02em"}
                ></Text>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Box
        display={["block", "block", "block", "none"]}
        mt={["230px", "50px", "50px", "150px"]}
        position={"relative"}
      >
        <Box
          position={"absolute"}
          width={["335px", "335px", "335px", "335px"]}
          height={["335px", "335px", "335px", "335px"]}
          left={["-80px", "-100px", "100px", "-100px"]}
          top={"50px"}
          background={
            "radial-gradient(50% 50% at 50% 50%, rgba(225, 137, 51, 0.4) 0%, rgba(225, 136, 51, 0.4) 0.01%, rgba(190, 59, 49, 0) 100%)"
          }
        />
        <Box
          position={"absolute"}
          width={["289px", "289px", "289px", "289px"]}
          height={["291px", "291px", "291px", "291px"]}
          left={["-76px", "-100px", "100px", "-100px"]}
          top={"390px"}
          background={
            "radial-gradient(50% 50% at 50% 50%, rgba(225, 137, 51, 0.4) 0%, rgba(225, 136, 51, 0.4) 0.01%, rgba(190, 59, 49, 0) 100%)"
          }
        />

        <Flex justifyContent={"center"} alignItems={"center"}>
          <Text
            fontFamily={"Nunito"}
            fontStyle={"normal"}
            fontWeight={"700"}
            fontSize={["25px", "30px", "30px", "50px"]}
            lineHeight={["34px", "40px", "68px", "68px"]}
            textTransform={"capitalize"}
            color={"#FFFFFF"}
            ml={["0px", "0px", "50px", "70px"]}
          >
            About UltiBets{" "}
          </Text>
          <Image
            src={"/images/svgs/bg/small-bg.svg"}
            alt={"UltiBets Logo"}
            width={["30px", "30px", "70px", "52px"]}
            height={["30px", "30px", "70px", "152px"]}
            ml={"20px"}
          />
        </Flex>
        <Flex
          mt={"60px"}
          gap={"50px"}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Flex
            justifyContent={"center"}
            direction={"column"}
            alignItems={["center", "center", "center", "start"]}
            gap={"15px"}
            width={"300px"}
          >
            <Text
              fontWeight={"700"}
              alignItems={["center", "center", "center", "start"]}
              fontStyle={"normal"}
              fontSize={["22px", "22px", "22px", "32px"]}
              lineHeight={["27px", "27px", "27px", "68px"]}
              textTransform={"capitalize"}
              color={"#FFFFFF"}
            >
              Various Formats and Categories
            </Text>
            <Flex
              alignItems={"center"}
              direction={"column"}
              width={"305px"}
            >
              <Text
                fontFamily={"Inter"}
                fontWeight={"500"}
                fontStyle={"normal"}
                fontSize={"15px"}
                color={"#FFFFFF"}
                lineHeight={"18px"}
                letterSpacing={"0.02em"}
              >
                <Text as={"span"} color={"#E18935"}>
                  {/* &nsbp;  */}
                  Home / Draw / Away
                </Text>
                &nbsp;Predictions,
                <Text as={"span"} color={"#E18935"}>
                  {/* &nsbp;  */}
                  &nbsp;Yes/No Binary
                </Text>
                &nbsp; Predictions and
                <Text as={"span"} color={"#E18935"}>
                  &nbsp;Side
                </Text>
                &nbsp;Predictions will be
                <Text as={"span"} color={"#E18935"}>
                  &nbsp;available in 11 categories.
                </Text>
              </Text>
            </Flex>
          </Flex>
          <Flex
            justifyContent={"center"}
            direction={"column"}
            alignItems={"center"}
            gap={"15px"}
            width={"300px"}
          >
            <Text
              fontWeight={"700"}
              alignItems={["center", "center", "center", "start"]}
              fontStyle={"normal"}
              fontSize={["22px", "22px", "22px", "32px"]}
              lineHeight={["27px", "27px", "27px", "68px"]}
              textTransform={"capitalize"}
              color={"#FFFFFF"}
            >
              Powered By Blockchain Technology{" "}
            </Text>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              direction={"column"}
              width={"305px"}
            >
              <Text
                fontFamily={"Inter"}
                fontWeight={"500"}
                fontStyle={"normal"}
                fontSize={"15px"}
                color={"#FFFFFF"}
                lineHeight={"18px"}
                letterSpacing={"0.02em"}
              >
                Predictions are coded into
                <Text as={"span"} color={"#E18935"}>
                  {/* &nsbp;  */}
                  &nbsp;smart contracts&nbsp;
                </Text>
                and deployed onto the blockchain{" "}
                <Text as={"span"} color={"#E18935"}>
                  assuring fairness and transparency.
                </Text>
              </Text>
            </Flex>
          </Flex>
          <Flex
            justifyContent={"center"}
            direction={"column"}
            alignItems={["center", "center", "center", "start"]}
            gap={"15px"}
            width={"300px"}
          >
            <Text
              fontWeight={"700"}
              alignItems={["center", "center", "center", "start"]}
              fontStyle={"normal"}
              fontSize={["22px", "22px", "22px", "32px"]}
              lineHeight={["27px", "27px", "27px", "68px"]}
              textTransform={"capitalize"}
              color={"#FFFFFF"}
            >
              a new gain system with pool sides{" "}
            </Text>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              direction={"column"}
              width={"305px"}
            >
              <Text
                fontFamily={"Inter"}
                fontWeight={"500"}
                fontStyle={"normal"}
                fontSize={"15px"}
                color={"#FFFFFF"}
                lineHeight={"18px"}
                letterSpacing={"0.02em"}
              >
                Gains are based on the percentage of share you own from your
                side selection.
              </Text>
              <Text
                fontFamily={"Inter"}
                fontWeight={"500"}
                fontStyle={"normal"}
                fontSize={"15px"}
                color={"#ffffff"}
                lineHeight={"18px"}
                letterSpacing={"0.02em"}
              >
                {" "}
                <Text as={"span"} color={"#E18935"}>
                  The more you predict, the more you gain from the other side if
                  your win.&nbsp;
                </Text>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default About;
