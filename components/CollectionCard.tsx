import { formatAddress } from "@/lib/format";
import { Flex, FlexProps, Grid, GridItem, Image, Text } from "@chakra-ui/react";

interface CollectionCardProps extends FlexProps {
  name: string;
  address: string;
  logoUrl: string;
  bannerUrl: string;
}

const CollectionCard = ({
  name,
  address,
  logoUrl,
  bannerUrl,
  ...props
}: CollectionCardProps) => {
  return (
    <Flex
      direction="column"
      width="100%"
      height="200px"
      padding={2}
      position="relative"
      justifyContent="end"
      zIndex="base"
      {...props}
    >
      <Image
        src={bannerUrl}
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        width="100%"
        height="100%"
        objectFit="cover"
        zIndex={-1}
        borderRadius="md"
        alt="Collection banner"
      />
      <Grid
        templateAreas='"logo name" "logo address"'
        templateColumns="3rem 1fr"
        gap=".5rem 1rem"
        padding={4}
        layerStyle="glassSurface"
        color="font.primary"
        borderRadius="base"
      >
        <GridItem gridArea="logo" alignSelf="center">
          <Image src={logoUrl} borderRadius="full" alt="Collection logo" />
        </GridItem>
        <GridItem gridArea="name">
          <Text textStyle="h4" noOfLines={1}>
            {name}
          </Text>
        </GridItem>
        <GridItem gridArea="address">
          <Text>{formatAddress(address)}</Text>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default CollectionCard;
