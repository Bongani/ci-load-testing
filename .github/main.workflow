workflow "Push Workflow" {
  resolves = ["K6 load testing"]
  on = "push"
}

action "K6 load testing" {
  uses = "actions/docker/cli@86ff551d26008267bb89ac11198ba7f1d807b699"
  args = "docker run loadimpact/k6 run github.com/loadimpact/k6/samples/http_get.js"
}
