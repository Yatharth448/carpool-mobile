import connection from '../../network/connection';

export const hitApiToAddBank = async (accountNumber, ifscCode, accountName) => {
    try {
        const result = await connection.postAPI('/api/wallet/add/bank', {
            account_number: accountNumber,
            ifsc_code: ifscCode,
            name: accountName
        });

        if (result.success) {
            return result;
        } else {
            return result;
        }
    } catch (error) {
        console.error('login modal', error);
        throw error;
    }
};

export const hitApiToGetAllBanks = async () => {
    try {
      const result = await connection.getAPI('/api/wallet/get/banks');
  
      if (result.success) {
        return result;
      } else {
        return result;
      }
    } catch (error) {
      console.error('login modal', error);
      throw error;
    }
  };

  export const hitApiToWithdrawFromWallet = async (bankId, amount) => {
    try {
        const result = await connection.postAPI('/api/wallet/withdraw/request', {
            bank_id: bankId,
            amount: amount,
        });

        if (result.success) {
            return result;
        } else {
            return result;
        }
    } catch (error) {
        console.error('login modal', error);
        throw error;
    }
};