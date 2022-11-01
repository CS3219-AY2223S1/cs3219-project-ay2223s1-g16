{{/*
Name for the coderunner_svc resources    
*/}}
{{- define "peerprep.coderunner_svc.name" -}}
{{ include "peerprep.name" . }}-coderunner-svc
{{- end }}

{{/*
Selector labels
*/}}
{{- define "peerprep.coderunner_svc.selectorLabels" -}}
app.kubernetes.io/name: {{ include "peerprep.coderunner_svc.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "peerprep.coderunner_svc.labels" -}}
helm.sh/chart: {{ include "peerprep.chart" . }}
{{ include "peerprep.coderunner_svc.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}