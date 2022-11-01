{{/*
Name for the communication_svc resources    
*/}}
{{- define "peerprep.communication_svc.name" -}}
{{ include "peerprep.name" . }}-communication-svc
{{- end }}

{{/*
Selector labels
*/}}
{{- define "peerprep.communication_svc.selectorLabels" -}}
app.kubernetes.io/name: {{ include "peerprep.communication_svc.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "peerprep.communication_svc.labels" -}}
helm.sh/chart: {{ include "peerprep.chart" . }}
{{ include "peerprep.communication_svc.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}