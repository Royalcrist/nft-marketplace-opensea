import {
  Button,
  Flex,
  FlexProps,
  Grid,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { ArrowRight } from "iconoir-react";

interface NftCardProps extends FlexProps {
  name: string;
  price: string;
  image: string;
  hideBuyButton?: boolean;
  isUnlisted?: boolean;
}

const NftCard = ({
  name,
  image,
  price,
  hideBuyButton,
  isUnlisted,
  ...props
}: NftCardProps) => {
  return (
    <Flex
      direction="column"
      width="100%"
      height="0"
      padding={2}
      paddingTop="calc(100% - .5rem)"
      position="relative"
      justifyContent="end"
      zIndex="base"
      {...props}
    >
      <Image
        src={image}
        position="absolute"
        width="100%"
        height="100%"
        top={0}
        left={0}
        right={0}
        bottom={0}
        objectFit="cover"
        zIndex={-1}
        borderRadius="md"
        alt="Collection banner"
      />
      <Grid templateColumns={hideBuyButton ? "1fr" : "3fr 1fr"} gap={4}>
        <Flex
          direction="column"
          gap={2}
          padding={4}
          layerStyle="glassSurface"
          color="font.primary"
          borderRadius="base"
        >
          <Text textStyle="h4" noOfLines={1}>
            {name}
          </Text>

          <Text noOfLines={1}>{isUnlisted ? "Unlisted" : price}</Text>
        </Flex>
        {!hideBuyButton && (
          <Button pointerEvents="none" height="100%">
            <Icon as={ArrowRight} boxSize={8} />
          </Button>
        )}
      </Grid>
    </Flex>
  );
};

export default NftCard;
