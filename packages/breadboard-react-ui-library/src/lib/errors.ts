import { BreadboardElementError, BreadboardErrorHandler } from "../../../breadboard-ui/src/types/types";

export const handleError = (onError?: BreadboardErrorHandler) => (error: BreadboardElementError) => { 
    if (onError) {
      return onError(error);
    }
    console.error(`There was an error.`, error);
  };