{{/*
    Name for the matching_svc resources    
*/}}
{{- define "peerprep.matching_svc.name" -}}
{{ include "peerprep.name" . }}-matching-svc
{{- end }}

{{/*
Selector labels
*/}}
{{- define "peerprep.matching_svc.selectorLabels" -}}
app.kubernetes.io/name: {{ include "peerprep.matching_svc.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "peerprep.matching_svc.labels" -}}
helm.sh/chart: {{ include "peerprep.chart" . }}
{{ include "peerprep.matching_svc.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}