export const maskMemberId = (memberId) => {
  if (!memberId || memberId.length <= 2) {
    return memberId;
  }

  const firstChar = memberId[0];
  const lastChar = memberId[memberId.length - 1];
  const maskedChars = "*".repeat(memberId.length - 2);

  return `${firstChar}${maskedChars}${lastChar}`;
};

export const formatValueWithCurrency = (value) => {
  // Check if the value is a number
  if (typeof value === 'number') {
    return `$${value}`;
  } else {
    return value;
  }
};

export const maskMemberIdFourLatter = (id) => {
  if (!id || id.length <= 6) {
    return id;
  }

  const firstFour = id.slice(0, 4);
  const lastTwo = id.slice(-4);
  const maskedChars = "*".repeat(4);

  return `${firstFour}${maskedChars}${lastTwo}`;
};



export const convertUSDToBNB = async (usdAmount) => {
  try {
    // Fetch current BNB price in USD from CoinGecko
    // const response = await axios.get(
    //   "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd"
    // );
    
    const bnbPriceInUSD =  697.65;

    const bnbAmount = usdAmount / bnbPriceInUSD;

    return bnbAmount;
  } catch (error) {
    console.error("Error during conversion:", error);
  }
};



// Mask email address to show only first 2 chars and domain
export const maskEmail = (email) => {
  if (!email) return '';
  
  const [username, domain] = email.split('@');
  if (!domain) return email;

  const maskedUsername = username.slice(0, 2) + '*'.repeat(username.length - 2);
  return `${maskedUsername}@${domain}`;
};

// Mask phone number to show only last 4 digits
export const maskPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  
  // Remove any non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Keep last 4 digits, mask the rest
  const lastFourDigits = cleaned.slice(-2);
  const maskedPart = '*'.repeat(cleaned.length - 2);
  
  return maskedPart + lastFourDigits;
};

