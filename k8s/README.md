# GKE Information

## Push a helm chart to the Artifact Registry

First get the key json file in your current directory.

Next run the below command:
<br/>
`cat cs3219-peerprep-g16-5df10e04367a.json | docker login -u _json_key --password-stdin https://asia-southeast1-docker.pkg.dev`

Afterwards we need to export the configuration so that helm will use the credentials to upload to Artifact Registry:
<br/>
`export HELM_REGISTRY_CONFIG=~/.docker/config.json `

We can then push the packaged file to the Artifact Registry:
<br/>
`helm push peerprep-0.1.0.tgz oci://asia-southeast1-docker.pkg.dev/cs3219-peerprep-g16/peerprep`

Verify that the chart is indeed there:
<br/>
`gcloud artifacts docker images list asia-southeast1-docker.pkg.dev/cs3219-peerprep-g16/peerprep`

## Deploy helm chart to GKE

### Installing the chart:

Go to the cloud console on GKE.

We need to authenticate first:
<br/>
`gcloud auth application-default print-access-token | helm registry login -u oauth2accesstoken \ --password-stdin https://asia-southeast1-docker.pkg.dev`

We can then install the chart:
<br/>
`helm install peerprep oci://asia-southeast1-docker.pkg.dev/cs3219-peerprep-g16/peerprep/peerprep --version 0.1.0`

### Pulling the chart:

`helm pull oci://asia-southeast1-docker.pkg.dev/cs3219-peerprep-g16/peerprep/peerprep --version 0.1.0`
