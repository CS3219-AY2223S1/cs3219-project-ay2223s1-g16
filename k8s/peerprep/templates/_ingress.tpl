{{/*
    Name for the ingress resource
*/}}
{{- define "peerprep.ingress.name" -}}
{{ include "peerprep.name" . }}-ingress
{{- end }}

{{/*
Selector labels
*/}}
{{- define "peerprep.ingress.selectorLabels" -}}
app.kubernetes.io/name: {{ include "peerprep.ingress.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "peerprep.ingress.labels" -}}
helm.sh/chart: {{ include "peerprep.chart" . }}
{{ include "peerprep.ingress.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}