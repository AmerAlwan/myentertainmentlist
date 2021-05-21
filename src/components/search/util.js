import axios from 'axios';

const resources = {};

const makeRequestCreator = () => {
  let cancel;

  return async (...query) => {
    console.log(query);
    if (cancel) {
      // Cancel the previous request before making a new request
      cancel.cancel();
    }
    // Create a new CancelToken
    cancel = axios.CancelToken.source();
    try {
//      if (resources[query]) {
//        // Return result if it exists
//        console.log("Returned Exisitng Query");
//        return resources[query];
//      }

      const queries = query.map(q => (axios.get(q, {cancelToken: cancel.token})))
      const res = await axios.all(queries);
      console.log(res)

      const result = res
      // Store response
      resources[query] = result;

      return result;
    } catch (error) {
      if (axios.isCancel(error)) {
        // Handle if request was cancelled
        console.log('Request canceled', error.message);
      } else {
        // Handle usual errors
        console.log('Something went wrong: ', error.message);
      }
    }
  };
};

export const search = makeRequestCreator()
