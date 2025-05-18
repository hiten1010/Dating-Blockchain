// Define types for the Leap wallet
declare global {
  interface Window {
    leap: {
      enable: (chainId: string) => Promise<string[]>;
      disconnect: (chainId: string) => Promise<void>;
      getOfflineSigner: (chainId: string) => any;
    };
  }
}

// Chain ID for Cosmos
export const COSMOS_CHAIN_ID = "cosmoshub-4";

/**
 * Check if the Leap wallet extension is installed
 */
export const isLeapWalletInstalled = (): boolean => {
  return window.leap !== undefined;
};

/**
 * Connect to the Leap wallet
 * @returns {Promise<string>} The connected wallet address
 */
export const connectLeap = async (): Promise<string> => {
  try {
    if (!isLeapWalletInstalled()) {
      throw new Error("Leap wallet not installed");
    }
    
    // Request access to the wallet
    const accounts = await window.leap.enable(COSMOS_CHAIN_ID);
    
    if (accounts && accounts.length > 0) {
      return accounts[0];
    } else {
      throw new Error("No accounts found in Leap wallet");
    }
  } catch (error) {
    console.error("Error connecting to Leap wallet:", error);
    throw error;
  }
};

/**
 * Format an address to display a shortened version
 * @param {string} address - The full wallet address
 * @param {number} prefixLength - Number of characters to show at the beginning
 * @param {number} suffixLength - Number of characters to show at the end
 * @returns {string} Formatted address (e.g., "cosmos1abc...xyz")
 */
export const formatAddress = (
  address: string,
  prefixLength: number = 6,
  suffixLength: number = 4
): string => {
  if (!address) return "";
  
  if (address.length <= prefixLength + suffixLength) {
    return address;
  }
  
  return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`;
}; 