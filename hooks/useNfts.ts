import { openseaSDK } from "@/services/opensea";
import { OpenSeaAsset, OpenSeaAssetContract } from "opensea-js/lib/types";
import { useState, useEffect, useCallback } from "react";

const useNfts = (address?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<OpenSeaAsset[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentAddress, setCurrentAddress] = useState<string | undefined>();

  const fetchData = useCallback(
    async (address: OpenSeaAssetContract["address"]) => {
      if (currentAddress === address) return;

      setIsLoading(true);
      try {
        //Check if address is valid
        if (!address || !address.match(/^0x[a-fA-F0-9]{40}$/)) {
          throw new Error("Invalid address");
        }

        const { assets } = await openseaSDK.api.getAssets({
          asset_contract_address: address,
          limit: 20,
        });
        setData(assets);
        setCurrentAddress(address);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [currentAddress]
  );

  const fetchNextPage = useCallback(async () => {
    if (!currentAddress) return;

    setIsLoading(true);
    try {
      const { assets } = await openseaSDK.api.getAssets({
        asset_contract_address: currentAddress,
        limit: 20,
        offset: data.length,
      });

      setData((prevData) => [...prevData, ...assets]);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [currentAddress, data.length]);

  useEffect(() => {
    if (address) {
      fetchData(address);
    }
  }, [address, fetchData]);

  return { data, fetchData, fetchNextPage, isLoading, error };
};

export default useNfts;
