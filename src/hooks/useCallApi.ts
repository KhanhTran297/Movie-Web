import { instance } from "@/apis/instance";
function useCallApi() {
  const UseGet = <T>({
    url = "",
    params = {},
    // headers = {},
  }) => {
    return new Promise<T>((resolve, reject) => {
      instance
        .get(url, {
          params,
          ...instance.defaults.headers,
        })
        .then((response) => {
          resolve(response as T);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const UsePost = ({ url = "", data = {}, headers = {}, params = {} }) => {
    return new Promise((resolve, reject) => {
      instance
        .post(
          url,
          {
            params,
            ...instance.defaults.headers,
          },
          data
        )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const UseEdit = ({ url = "", data = {}, headers = {}, params = {} }) => {
    return new Promise((resolve, reject) => {
      instance
        .put(
          url,
          {
            params,
            ...instance.defaults.headers,
          },
          data
        )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const UseDelete = ({ url = "", data = {}, headers = {}, params = {} }) => {
    return new Promise((resolve, reject) => {
      instance
        .delete(url, {
          params,
          ...instance.defaults.headers,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  return {
    UseGet,
    UsePost,
    UseEdit,
    UseDelete,
  };
}
export default useCallApi;
