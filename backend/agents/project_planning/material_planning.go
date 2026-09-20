package projectplanning

// MaterialPlan captures the recommended procurement view for a project.
type MaterialPlan struct {
	ProjectName   string
	CriticalItems []string
	ForecastDays  int
	Notes         string
}

// GenerateMaterialPlan builds a simple planning summary for the provided project.
func GenerateMaterialPlan(projectName string, criticalItems []string) MaterialPlan {
	plan := MaterialPlan{
		ProjectName:   projectName,
		CriticalItems: append([]string(nil), criticalItems...),
		ForecastDays:  30,
		Notes:         "Review lead times, site constraints, and approvals before committing to procurement.",
	}

	if len(plan.CriticalItems) == 0 {
		plan.CriticalItems = []string{"No critical items identified"}
	}

	return plan
}
