# GKE Information

## Useful links

- [Managing Helm charts](https://cloud.google.com/artifact-registry/docs/helm/manage-charts)
- [Storing docker images in artifact registry](https://cloud.google.com/artifact-registry/docs/docker/store-docker-container-images)

## Debugging helm charts

You can view the output of your helm chart template through using the make command:

Go to the k8s directory:\

`cd k8s`

Run the make command:

`make template`

## Push a helm chart to the Artifact Registry

First get the key json file in your current directory. This can be done by downloading the key file from the service accounts on GCP under the IAM tab.

Next run the below command:

`cat cs3219-peerprep-g16-5df10e04367a.json | docker login -u _json_key --password-stdin https://asia-southeast1-docker.pkg.dev`

We also want to setup authentication with docker for our region:

`gcloud auth configure-docker asia-southeast1-docker.pkg.dev`

Afterwards we need to export the configuration so that helm will use the credentials to upload to Artifact Registry:

`export HELM_REGISTRY_CONFIG=~/.docker/config.json`

We can then push the packaged file to the Artifact Registry (replace `<VERSION>` with the latest version):

`helm push peerprep-<VERSION>.tgz oci://asia-southeast1-docker.pkg.dev/cs3219-peerprep-g16/peerprep`

Verify that the chart is indeed there:

`gcloud artifacts docker images list asia-southeast1-docker.pkg.dev/cs3219-peerprep-g16/peerprep`

---

## Deploy helm chart to GKE

Go to the cloud console on GKE.

We need to authenticate first:

`gcloud auth application-default print-access-token | helm registry login -u oauth2accesstoken --password-stdin https://asia-southeast1-docker.pkg.dev`

And next create the kubeconfig entry:

`gcloud container clusters get-credentials peerprep --region=asia-southeast1`

We can then install the chart:

`helm install peerprep oci://asia-southeast1-docker.pkg.dev/cs3219-peerprep-g16/peerprep/peerprep --version 1.0.6`

### Pulling the chart to local environment:

`helm pull oci://asia-southeast1-docker.pkg.dev/cs3219-peerprep-g16/peerprep/peerprep --version 0.1.0`
