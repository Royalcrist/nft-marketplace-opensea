import CollectionCard from "@/components/CollectionCard";
import { ExpandableText } from "@/components/ExpandableText";
import NftCard from "@/components/NftCard";
import useNfts from "@/hooks/useNfts";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ArrowLeft,
  ArrowTr,
  Discord,
  Link,
  Search,
  Telegram,
  Twitter,
} from "iconoir-react";
import Head from "next/head";
import { OpenSeaAsset } from "opensea-js/lib/types";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [contractAddress, setContractAddress] = useState<string | undefined>();
  const {
    data: nfts,
    fetchData: fetchNfts,
    fetchNextPage,
  } = useNfts(contractAddress);
  const [selectedNft, setSelectedNft] = useState<OpenSeaAsset | undefined>();

  const getNftPrice = (nft: OpenSeaAsset) => {
    const price = nft.sellOrders?.[0]?.currentPrice?.toString();
    return price ? (Number(price) / 1e18).toFixed(2) : "0";
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === "") {
      setContractAddress(undefined);
    } else {
      setContractAddress(value);
    }
  };

  useEffect(() => {
    if (contractAddress) {
      fetchNfts(contractAddress);
    }
  }, [contractAddress, fetchNfts]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleNftClick = (nft: OpenSeaAsset) => () => {
    setSelectedNft(nft);
    onOpen();
  };

  return (
    <>
      <Head>
        <title>NFT Marketplace</title>
        <meta name="description" content="NFT Marketplace" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box paddingX={4} paddingY={16}>
        <Grid
          templateAreas={{
            base: '"collection" "nfts"',
            lg: '"collection nfts"',
          }}
          templateColumns={{ base: "auto", lg: "1fr 2fr" }}
          gap={{ base: 0, lg: 16 }}
        >
          <GridItem gridArea="collection">
            {/* Search */}
            <Flex direction="column" gap={6} width="100%" marginBottom="3rem">
              <Heading as="h1" size="2xl">
                Search collection
              </Heading>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    height="100%"
                    paddingLeft={8}
                  >
                    <Icon as={Search} />
                  </InputLeftElement>
                  <Input
                    placeholder="0xe7f8...f6bb"
                    paddingLeft={14}
                    onChange={handleSearch}
                  />
                </InputGroup>
                {nfts.length == 0 && (
                  <FormHelperText>
                    Copy and paste your favorite collection smart contract
                    address.
                  </FormHelperText>
                )}
              </FormControl>
            </Flex>

            {nfts.length > 0 && (
              <>
                {/* Collection */}
                <Flex
                  direction="column"
                  gap={8}
                  width="100%"
                  marginBottom="4rem"
                >
                  <CollectionCard
                    name={nfts[0].collection.name}
                    address={nfts[0].assetContract.address}
                    bannerUrl={nfts[0].collection.featuredImageUrl}
                    logoUrl={nfts[0].collection.imageUrl}
                  />

                  <ExpandableText noOfLines={3} maxW="calc(100vw - 2rem)">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {nfts[0].collection.description}
                    </ReactMarkdown>
                  </ExpandableText>

                  <Flex direction="row" gap={4}>
                    <IconButton
                      size="lg"
                      aria-label="Website"
                      icon={<Icon as={Link} boxSize={6} />}
                      backgroundColor="#FF922E"
                    />
                    <IconButton
                      size="lg"
                      aria-label="Twitter"
                      icon={<Icon as={Twitter} boxSize={6} />}
                      backgroundColor="#1DA1F2"
                    />
                    <IconButton
                      size="lg"
                      aria-label="Discord"
                      icon={<Icon as={Discord} boxSize={6} />}
                      backgroundColor="#7289DA"
                    />
                    <IconButton
                      size="lg"
                      aria-label="Telegram"
                      icon={<Icon as={Telegram} boxSize={6} />}
                      backgroundColor="#0088CC"
                    />
                  </Flex>
                </Flex>{" "}
              </>
            )}
          </GridItem>

          <GridItem gridArea="nfts">
            {/* NFTs */}

            {nfts.length > 0 && (
              <InfiniteScroll
                dataLength={nfts.length} //This is important field to render the next data
                next={fetchNextPage}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                <Grid
                  templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
                  gap={8}
                >
                  {nfts.map((nft) => (
                    <NftCard
                      key={`nft-card-${nft.tokenId}`}
                      name={nft.name}
                      image={nft.imageUrl}
                      price={getNftPrice(nft)}
                      onClick={handleNftClick(nft)}
                      isUnlisted={nft.sellOrders?.length === 0}
                    />
                  ))}
                </Grid>
              </InfiniteScroll>
            )}
          </GridItem>
        </Grid>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        motionPreset="slideInRight"
        blockScrollOnMount
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Button onClick={onClose} variant="tertiary" paddingLeft={0}>
              <Icon as={ArrowLeft} />
              Back
            </Button>
            {selectedNft && (
              <>
                <Flex direction="column" gap={8}>
                  <Flex direction="column" gap={4}>
                    <NftCard
                      key={`nft-card-${selectedNft?.tokenId}`}
                      name={selectedNft?.name}
                      image={selectedNft?.imageUrl}
                      price={getNftPrice(selectedNft)}
                      onClick={handleNftClick(selectedNft)}
                      hideBuyButton
                    />

                    <ExpandableText noOfLines={3} maxW="calc(100vw - 2rem)">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {selectedNft.description}
                      </ReactMarkdown>
                    </ExpandableText>
                  </Flex>

                  <Flex direction="column" gap={4}>
                    <Text fontSize="h2" as="h2">
                      Attributes
                    </Text>
                    <Grid
                      templateColumns="repeat(auto-fit, minmax(12rem, 1fr))"
                      gap={4}
                    >
                      {selectedNft?.traits?.map((trait: any, index: number) => (
                        <Flex
                          key={`trait-${index}`}
                          direction="column"
                          gap={2}
                          backgroundColor="background.surface"
                          padding={4}
                          borderRadius="base"
                          alignItems="center"
                        >
                          <Text fontSize="xs" as="h3" margin={0}>
                            {trait?.trait_type}
                          </Text>
                          <Text fontStyle="h4" as="h4" color="font.primary">
                            {trait?.value}
                          </Text>
                        </Flex>
                      ))}
                    </Grid>
                  </Flex>
                </Flex>
                <Box
                  layerStyle="glassSurface"
                  position="fixed"
                  bottom={0}
                  left={0}
                  right={0}
                  padding={2}
                  paddingBottom={4}
                  borderTopRadius="md"
                >
                  <Button
                    as="a"
                    width="100%"
                    href={selectedNft.openseaLink}
                    target="_blank"
                  >
                    Buy on OpenSea <Icon as={ArrowTr} marginLeft={2} />
                  </Button>
                </Box>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
