import connection from '../../network/connection';

export const hitApiToForgotPassword = async (email) => {
  try {
    const result = await connection.postAPI('/api/forgot/sendemail', {
      'email': email,
    });

    if (result.success) {
      return result;
    } else {
      return result;
    }
  } catch (error) {
    console.error('forgot modal', error);
    throw error;
  }
};

export const hitApiToForgotVerify = async (email, otp, password) => {
    try {
      const result = await connection.postAPI('/api/forgot/verify', {
        'email': email,
        'otp': otp,
        'password': password
      });
  
      if (result.success) {
        return result;
      } else {
        return result;
      }
    } catch (error) {
      console.error('forgot modal', error);
      throw error;
    }
  };