export const formatCurrency = (amount, hideValue = false) => {
  return hideValue 
    ? '₹***,***' 
    : `₹${amount.toLocaleString('en-IN')}`;
};

export const formatPercentage = (value, hideValue = false) => {
  return hideValue ? '**%' : `${value}%`;
};

export const getReturnColor = (returns, darkMode = false) => {
  return returns >= 0 
    ? `${darkMode ? 'text-green-400' : 'text-green-600'}` 
    : `${darkMode ? 'text-red-400' : 'text-red-600'}`;
};
