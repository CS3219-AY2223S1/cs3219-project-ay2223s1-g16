{{/*
Name for the collab_svc resources    
*/}}
{{- define "peerprep.collab_svc.name" -}}
{{ include "peerprep.name" . }}-collab-svc
{{- end }}

{{/*
Selector labels
*/}}
{{- define "peerprep.collab_svc.selectorLabels" -}}
app.kubernetes.io/name: {{ include "peerprep.collab_svc.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "peerprep.collab_svc.labels" -}}
helm.sh/chart: {{ include "peerprep.chart" . }}
{{ include "peerprep.collab_svc.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}