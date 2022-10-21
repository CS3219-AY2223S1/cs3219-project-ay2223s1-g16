import axios from "axios";

const userSvcAxiosClient = axios.create({
  baseURL: import.meta.env.VITE_USER_SVC_URL,
});

const qnSvcAxiosClient = axios.create({
  baseURL: import.meta.env.VITE_QN_SVC_URL,
});

const coderunnerSvcAxiosClient = axios.create({
  baseURL: import.meta.env.VITE_CODERUNNER_SVC_URL,
});

const requests = (api: any) => {
  return {
    get: (url: string, token?: string) => {
      return api.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    },
    post: (url: string, data: object, token?: string) => {
      if (token) {
        return api.post(url, data, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      }
      return api.post(url, data);
    },
    patch: (url: string, data: object, token?: string) => {
      return api.patch(url, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    },
    delete: (url: string, token?: string) => {
      return api.delete(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    },
  };
};

const userSvcClient = requests(userSvcAxiosClient);
const qnSvcClient = requests(qnSvcAxiosClient);
export { userSvcClient, qnSvcClient, coderunnerSvcAxiosClient };
