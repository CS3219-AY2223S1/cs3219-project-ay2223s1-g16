import axios from "axios";

const userSvcAxiosClient = axios.create({
  baseURL: "http://localhost:8000/api/user/",
});

const matchingSvcAxiosClient = axios.create({
  baseURL: "http://localhost:5000/api/match/",
});

const requests = (api: any) => {
  return {
    get: (url: string) => {
      return api.get(url);
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
    patch: (url: string, data: object, token: string) => {
      return api.patch(url, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    },
    delete: (url: string, token: string) => {
      return api.delete(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    },
  };
};

const userSvcClient = requests(userSvcAxiosClient);
const matchingSvcClient = requests(matchingSvcAxiosClient);
export { userSvcClient, matchingSvcClient };
