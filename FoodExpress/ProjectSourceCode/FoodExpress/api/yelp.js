import axios from "axios";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization:
      "Bearer K2_-cx5Bab-4xfiYbXlasp5VhcxswVjUEFxSg9LDAbgAxuzB17wsA8NRquS_75diAAPk_nNTbXhB_O2qQ2JHTSG6I0kBwpRUOfNFNZKXN7kdPw5qcKfCeBWKaP_tX3Yx",
  },
});
