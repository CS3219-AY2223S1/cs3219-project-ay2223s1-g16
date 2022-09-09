{{/*
Name for the frontend resources    
*/}}
{{- define "peerprep.frontend.name" -}}
{{ include "peerprep.name" . }}-frontend
{{- end }}

{{/*
Selector labels
*/}}
{{- define "peerprep.frontend.selectorLabels" -}}
app.kubernetes.io/name: {{ include "peerprep.frontend.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "peerprep.frontend.labels" -}}
helm.sh/chart: {{ include "peerprep.chart" . }}
{{ include "peerprep.frontend.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}