export const getFirebaseErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already in use. Please use a different email.";
      case "auth/invalid-email":
        return "The email address is not valid. Please enter a valid email.";
      case "auth/operation-not-allowed":
        return "Email/password accounts are not enabled. Please contact support.";
      case "auth/weak-password":
        return "The password is too weak. Please choose a stronger password.";
      default:
        return "An unknown error occurred. Please try again.";
    }
  };