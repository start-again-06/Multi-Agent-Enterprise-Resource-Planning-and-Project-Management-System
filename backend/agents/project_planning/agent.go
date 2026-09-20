package projectplanning

// Agent represents the project planning domain specialist.
type Agent struct {
	Name        string
	Role        string
	Prompt      string
	Capabilities []string
}

// NewAgent creates the default project planning agent configuration.
func NewAgent() *Agent {
	return &Agent{
		Name:        "project_planning",
		Role:        "Project Planning Analyst",
		Prompt:      DefaultPrompt(),
		Capabilities: []string{
			"material planning",
			"shortage risk analysis",
			"schedule and resource forecasting",
		},
	}
}
