{{/*
Name for the question_svc resources    
*/}}
{{- define "peerprep.question_svc.name" -}}
{{ include "peerprep.name" . }}-question-svc
{{- end }}

{{/*
Selector labels
*/}}
{{- define "peerprep.question_svc.selectorLabels" -}}
app.kubernetes.io/name: {{ include "peerprep.question_svc.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "peerprep.question_svc.labels" -}}
helm.sh/chart: {{ include "peerprep.chart" . }}
{{ include "peerprep.question_svc.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}