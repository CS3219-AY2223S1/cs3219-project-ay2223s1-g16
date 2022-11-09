{{/*
Name for the user_svc resources    
*/}}
{{- define "peerprep.user_svc.name" -}}
{{ include "peerprep.name" . }}-user-svc
{{- end }}

{{/*
Selector labels
*/}}
{{- define "peerprep.user_svc.selectorLabels" -}}
app.kubernetes.io/name: {{ include "peerprep.user_svc.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "peerprep.user_svc.labels" -}}
helm.sh/chart: {{ include "peerprep.chart" . }}
{{ include "peerprep.user_svc.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}