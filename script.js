import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

var myFailRate = new Rate("failed requests");

export let options = {
  stages: [
      { duration: "5s", target: 10 },
      { duration: "5s", target: 20  },
      { duration: "5s", target: 5 },
    ],
  thresholds: {
      "failed requests": ["rate<0.1"], // <10% errors
    }
};

export let errorRate = new Rate("errors");

export default function() {
  let res = http.get("https://loadimpact.com");
  check(res, {
    "status was 200": (r) => r.status == 200,
     "transaction time OK": (r) => r.timings.duration < 200
  }); && myFailRate.add(2);
  sleep(1);
};
